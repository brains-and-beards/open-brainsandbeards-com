---
path: '/blog/handling-runtime-application-permissions-in-detox'
date: '2019-05-17T11:01:01.230Z'
title: Handling runtime application permissions in Detox
image: detox.jpeg
author: 'Wojciech Ogrodowczyk'
---

### Problem

One of the problems when working with [Detox](https://github.com/wix/Detox/) as a framework for end-to-end testing in your React Native application is unclear platform support. Once you dive into the project it quickly becomes clear that most people use it with iOS and a lot of Stackoverflow questions, answers, guides, etc. don’t mention platform differences, even though that’s sometimes crucial.

A good example of when it becomes complicated is when you try to find the recommended way of handling runtime permissions in your mobile app. The docs mention to use the API that’s provided and a lot of people on Stack Overflow and GitHub repeat that, saying it all works good, but there are some confused voices that just might not be using iOS 🤷‍♂️

So, in this blog post I’d like to write in more detail how such a platform-sensitive feature can be addressed in your Detox tests. Hopefully, it will not only give a step-by-step guide to working with runtime permissions, but also show a general approach how we can handle other platform-specific features.

![Yet another detox recipe.](detox.jpeg)

### Solutions

#### iOS

Easy, just use [the provided API.](https://github.com/wix/Detox/blob/master/docs/APIRef.DeviceObjectAPI.md#devicelaunchappparams) It lets us launch the app in a mode where detox will take care of accepting particular permissions as they are being asked for.

In that case, we can specify in our test whether we’re going to accept or deny permissions and handle both cases accordingly.

#### Android

However, the API described above relies on using [AppleSimUtils](https://github.com/wix/AppleSimulatorUtils), so it won’t work when we run our tests on the Android platform. We’ll need a different solution for that. Here enters detox’s take on mocking.

Detox doesn’t allow for per-test mocking, because the idea is that we make a single build of the app, deploy it to an emulator (or a device) and run multiple scenarios against this one build. So, if we want to have something mocked, we need to prepare an alternative file to be used. The details are of course described [in the docs](https://github.com/wix/Detox/blob/master/docs/Guide.Mocking.md).

But let’s dive a bit deeper into an example that will let us walk through this process.

#### Detox mocking in practice

Let’s have an app that makes sure during its onboarding process that the user gave it access to their contact list. A component that takes care of that could look something like this:

```javascript {numberLines: true}
// PermissionsScreen.ts
import React, { Component } from 'react'
import { Button, Text, PermissionsAndroid, View } from 'react-native'

class ContactCheckScreen extends Component {
  state = { contactsAllowed: false }

  componentDidMount = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts Reading App Permission to Read Contacts',
      message:
        'We need to have access to your contacts, otherwise the app is useless :(',
    }).then((result) => {
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({ contactsAllowed: true })
      } else {
        this.setState({ contactsAllowed: false })
      }
    })
  }

  render = () => {
    const { contactsAllowed } = this.state
    const header = contactsAllowed
      ? `Contact access allowed`
      : `Contact access NOT allowed`

    return (
      <View>
        <Text>{header}</Text>
        {!contactsAllowed && <Button label="Continue" primary />}
      </View>
    )
  }
}
```

The problem with end-to-end testing of such a component is that runtime permission modals that pop up are not controlled by the app, so we can’t tell Detox to just tap _allow_. To be able to move further, we need a way to avoid displaying this modal completely.

We can start with refactoring the permission request to a separate file. Those changes could look like that:

```javascript {numberLines: true}
// ContactCheckScreen.ts
import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'

import { getContactsPermission } from './permissions'

class ContactCheckScreen extends Component {
  state = { contactsAllowed: false }

  componentDidMount = () => {
    getContactsPermission().then((result) =>
      this.setState({ contactsAllowed: result })
    )
  }

  render = () => {
    const { contactsAllowed } = this.state
    const header = contactsAllowed
      ? `Contact access allowed`
      : `Contact access NOT allowed`

    return (
      <View>
        <Text>{header}</Text>
        {!contactsAllowed && <Button label="Continue" />}
      </View>
    )
  }
}
```

```javascript {numberLines: true}
// permissions.ts
import { PermissionsAndroid } from 'react-native'

export const getContactsPermission = async () => {
  const requestResult = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    {
      title: 'Contacts Reading App Permission to Read Contacts',
      message:
        'We need to have access to your contacts, otherwise the app is useless :(',
    }
  )
  return requestResult === PermissionsAndroid.RESULTS.GRANTED ? true : false
}
```

We’re still not finished, because although our component has been changed, it still does exactly the same thing. However, as we have extracted a permissions check to a separate file, it’s very easy to mock it out for an optimistic version that always returns true. It could look like this:

```javascript {numberLines: true}
// permissions.e2e.ts
export const getContactsPermission = async () => {
  return Promise.resolve(true)
}
```

Then, whenever we run the development server with the `RN_SRC_EXT` argument to specify the extension of the files, those mocked files will replace the original versions. For example, in my app using TypeScript and `yarn` I would run: `RN_SRC_EXT=e2e.ts yarn start`

Of course, that will mean that the app (in this particular build) will _pretend_ that it has the permissions, not actually _have_ them. In that case, when we try to get the contacts from the device, we’ll have to mock it out later as well (which would be a normal testing practise, so I don’t consider that a problem).

#### Dealing with 3rd party modules

But what happens when it’s not your code that’s requesting the permissions? For example `react-native-camera` will ask for camera access the first time it’s used.

In such a case we can switch the whole 3rd party component for a mocked one. For example, instead of `import { RNCamera } from ‘react-native-camera’` we can create a proxy _component provider_ that will decide what component to use. This way for detox testing we can use a mocked version.

```javascript {numberLines: true}
// CameraProvider.e2e.ts
import { View } from 'react-native'

export default View
```

```javascript {numberLines: true}
// CameraProvider.ts
import { RNCamera } from 'react-native-camera'

export default RNCamera
```

Obviously, in this case the mock doesn’t have _any_ functionality, because it’s just an empty `View`. If we want, we can add to it some API functionality that it might need to offer for our tests to pass.

#### Conclusion

As we can see, currently it’s not that straightforward to handle Android runtime permissions in Detox. It might seem a lot of hassle to go through this process. However, let’s keep in mind that (as always in programming) it’s a _tradeoff _— by using Detox we get faster and more reliable (reproducible) tests than with any other end-to-end solution. I think overall it’s still a big win.

Finally, if you liked this article, you might want to check the rest of [our blog](https://brainsandbeards.com/blog/). And if you already did, then stay tuned and make sure you subscribe to this blog to get our weekly tips for creating better mobile applications faster 🚀
