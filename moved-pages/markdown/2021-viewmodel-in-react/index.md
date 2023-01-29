---
path: '/blog/2021-viewmodel-in-react'
date: '2021-12-06T11:12:41.253Z'
title: 'Using ViewModel pattern in React'
image: header.jpg
author: Wojciech Ogrodowczyk
---

## Problem

Let's take a look at this piece of code that could come from any ecommerce application:

```
export const AddressContainer = () => {
  const { firstName, surname, phoneNumber } = usePersonalData();
  const { address, postalCode, city } = useAddress();

  return (
    <AddressCard
      customerName={`${firstName} ${surname}`}
      phoneNumber={phoneNumber}
      addressLine1={address}
      addressLine2={`${postalCode} ${city}`}
    />
  );
};
```

Looks short and simple, right? We get customer's personal and address data from our application store (Redux maybe?) and we pass it to our presentational component to display. What's there not to like?

Well, for one thing, you might not like the four props that you have to set to pass the data. The definite code smell here is that the container responsible for fetching the data also decides how to break up the address lines (by setting the `addressLine1` and `addressLine2` props).

Also, consider what will happen when we start expanding into foreign markets. Sometimes the expected way to display a name is "FIRSTNAME LASTNAME" and sometimes it's the exact opposite. Is the container responsible for this logic? Of course not, it just fetches the data. Is this presentational logic then? Not really, the presentational component doesn't even know what `locale` is currently set.

## Solution #1: Extract a ViewModel

One of the ways to solve this problem could be to introduce a new entity responsible for data formatting logic: a ViewModel. This would give us a way to take the data fetched from the container and format it in a way that is easy to use in the presentational component. In the simplest version it could look something like this:

```
class CustomerViewModel {
  constructor(personalData, addressData) {
    this.personalData = personalData;
    this.addressData = addressData;
  }

  getName() {
    const { firstName, surname } = this.personalData;
    return `${firstName} ${surname}`;
  }

  getPhoneNumber() {
    return this.personalData.phoneNumber;
  }

  getAddressLine1() {
    return this.addressData.address;
  }

  getAddressLine2() {
    const { postalCode, city } = this.addressData;
    return `${postalCode} ${city}`;
  }
}

const useCustomer = () => {
  const personalData = usePersonalData();
  const addressData = useAddress();

  const customer = new CustomerViewModel(personalData, addressData)
  return customer
}

export const AddressContainer = () => {
  const customer: CustomerViewModel = useCustomer()

  return <AddressCard
    customer={customer}
  />
}
```

Woah, that escalated quickly! It's three times as long as the original code, you might say. Yes, but it gives us advantages over the previous implementation:

- We have an **abstraction layer for localisation** of the data. We can pass locale information to the ViewModel and it will format the data for us.

- **Simpler API** for the AddressCard. One clear prop instead of four.

- We keep the **single responsibility principle**. We don't confuse data fetching and formatting in the AddressContainer.

- We ensure **consistent formatting** of the customer's data. By reusing our ViewModel across different components in the app we can make sure the same data (for example, the customer's phone number) is always displayed the same way.

- **Easier testability**. We encapsulated this logic and can easily unit test our data formatting. We can also very easily mock it for integration test of our presentational components.

But what if you don't want to write so much code? There must be an easier way with React, right?

## Solution #2: Selectors to the rescue

When we look at this example we can see that it's only about reading and formatting data. And what's responsible for fetching data? Selectors! So, let's try to refector it into a selector-based solution.

```
const customerData = (state) => state.customer;

const customerAddressSelector = createSelector(
  customerData,
  ({firstName, surname, address, postalCode, city}) => ({
    name: `${firstName} ${surname}`,
    addressLine1: address,
    addressLine2: `${postalCode} ${city}`
  })
);

export const AddressContainer = () => {
  const customerAddress = useSelector(customerAddressSelector);

  return <AddressCard address={customerAddress} />
}
```

It's definitely shorter and gives us basically the same functionality. However, selectors can only read data, so this solutions missed one thing that we should be able to do with a ViewModel: mutatations. Let's try to extend it then.

## Solution #3: ViewModel with event dispatch

In React we have this concept of one way data flow, where we use the state (whether local or global) to render components, which in turn can trigger events that modify this state. So, to get the power of performing mutations in our ViewModel, we'll just need to allow it to not only store data, but also trigger events. In the context of our example, it could look like this:

```
const customerData = (state) => state.customer;

const customerAddressSelector = createSelector(
  customerData,
  ({firstName, surname, address, postalCode, city}) => ({
    name: `${firstName} ${surname}`,
    addressLine1: address,
    addressLine2: `${postalCode} ${city}`
  })
);

const useCustomerAddress = () => {
  const customerAddress = useSelector(customerAddressSelector);
  const dispatch = useDispatch();

  const update = ({address, postalCode, city}) => {
    dispatch(updateCustomer({address, postalCode, city}));
  }

  return {
    ...customerAddress,
    update
  }
}

export const AddressContainer = () => {
  const address = useCustomerAddress()

  return <AddressCard address={customerAddress} />
}
```

Then the `AddressCard` could easily trigger updated on the address, through the API available directly in `customerAddress`.

The selector part hasn't changed at all, but instead of using a selector in our component, we use a hook that returns on object composed of the data from the selector and possible actions that you might want to perform on an address. In that case, updating it.

I think this version is a clear winner here. It offers an easy way to encapsulate both data fetching and mutations, while using minimal overhead in terms of syntax.
