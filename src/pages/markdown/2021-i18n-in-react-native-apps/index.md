---
path: '/blog/i18n-in-react-native-apps'
date: '2021-08-04T13:49:23.785Z'
title: 'i18n in React Native apps'
image: header.jpg
author: Błażej Lewandowski
imageCaption: 'Map photo by <a href="https://unsplash.com/photos/SFRw5GChoLA">Kelsey Knight</a>'
---

> _I18n_ is a shorthand / numeronym for word _internationalization_ where 18 stands for the number of letters between the _i_ and _n_.

It's very hard to build an app that doesn't have some text in it. We use it for instructions, we use it as main content, and we use it to describe what can be done within the app. Of course it's possible to build an app using no text at all, but as a species we've agreed that text is the most powerful and versatile tool for information exchange. Most of us know exactly what to expect when pressing a button described with text. Plus, it's also suitable for people with disabilities (who use screen readers).

But, handling text might be painful for an app developer. We developed many languages and complex forms to describe things in an exact manner. We use those sophisticated systems on a daily basis. Moreover we expect other people to use them as well and if someone uses a wrong form or inaccurate language we instantly think they are not particularly bright. (I hope I'm not going to get such a bad label after you read this article 😬)

As a developer you have to make sure your app is understandable to all your users, as well as your colleagues. The way you tackle text is the way people see you.

At B&B I recently had an opportunity to setup a new React Native project. One of the things that is worth to introduce straight away is an internationalization framework such as [react-i18next](https://react.i18next.com/). There are slightly different ways of using it, so in this article I'll try to explain **the way I use it**, which I hope is a way that you'll find useful as well.

## Setup

Install packages:

```sh
yarn add react-i18next i18next
```

Add the following files and directories (`.ts/.js` extensions depend on whether you want to TypeScript or not):

```
src
├── localization
│   ├── en
│   │   └── translation.json
│   └── i18n.ts
...
```

- The initialization file:

```ts {numberLines: true}
// src/localization/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from './en/translation.json'

export const resources = {
  en: {
    translation: translationEN,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})
```

In this example, we set the base app language to `en`, but you can check the user device's locale to use that instead. As for fallback language, I usually keep it set to `en` as most of our users understand it.

- Dictionary file:

```json {numberLines: true}
{
  "_comment": "src/localization/en/translation.json",
  "demoScope": {
    "title": "i18next is Great!",
    "description": "Everyone understands me!"
  }
}
```

All of your English translations go here.

- Add this import in the root of your project:

```tsx {numberLines: true}
// src/App.tsx
import './localization/i18n';
...
```

- If you use TypeScript (which I'd strongly suggest) you'll also need to add this declaration file:

```ts {numberLines: true}
// src/@types/react-i18next.d.ts
import { resources } from '@localization/i18n'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: typeof resources['en']
  }
}
```

This enables translation keys validation. We could probably set it to union type of different languages, but in our case we use `en` as a fallback language, so I think it is enough to check whether English translation exist.

## Basic usage

Now watch this! Instead of bloating our jsx with inline texts we can use the `useTranslation()` hook:

```tsx {numberLines: true}
import React from 'react'
import { Text } from 'react-native'
import { useTranslation } from 'react-i18next'

const Component: React.FC = () => {
  const { t } = useTranslation()
  return <Text>{t('demoScope.title')}</Text>
  // -> "i18next is Great!"
}
```

The `t()` function takes a `key` as a first argument and returns the translated string. Keys are declared in the `translation.json` file, which we created previously. You can nest your keys freely to scope them.

Now let's add another dictionary e.g. `src/localization/pl/translation.json`:

```json {numberLines: true}
{
  "demoScope": {
    "title": "i18next jest świetne!",
    "description": "Wszyscy mnie rozumieją!"
  }
}
```

And modify our init function, to import newly created dictionary and set it as default:

```ts {numberLines: true}
// src/localization/i18n.ts
...
import translationEN from './en/translation.json'
import translationPL from './pl/translation.json'

export const resources = {
  en: {
    translation: translationEN,
  },
  pl: {
    translation: translationPL,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'pl',
  ...
})
```

Now you should be able to see your text in Polish language!

## Interpolation

What if I need to render some value, which is not constant, but I still want to use translation files? We _could_ use the `t()` function with `.replace()`, but there is a cleaner solution!

- You can enclose your variables using double brackets, and then provide them like this:

```json  {numberLines: true}
{
  "key": "{{what}} is {{how}}"
}
```

```tsx  {numberLines: true}
t('key', { what: 'i18next', how: 'Great!' })
// -> "i18next is Great!"
```

- You can even provide whole objects:

```json  {numberLines: true}
{
  "key": "Reading: {{article.title}} ..."
}
```

```tsx  {numberLines: true}
const article = {
  title: 'i18n in React Native apps',
  author: '@blazlew',
}
t('key', { article })
// -> "Reading: i18n in React Native apps ..."
```

- In case you want to apply a different style for part of your translation you can use the `Trans` component:

```json  {numberLines: true}
{
  "transKey": "Some <bold>crazy</bold> stuff"
}
```

```tsx  {numberLines: true}
<Trans
  i18nKey="transKey"
  components={{ bold: <Text style={styles.boldText} /> }}
/>
```

From the docs you can read this is an _alternative usage_ of `Trans` component. But for me it works great and I use it only if I need extra styles.

## Formatting

Until now we've only talked about translations, which is just a part of the whole i18n topic. We also need localisation (l10n), a way to display different values in a format that our user understands. When we display a number, a lot of times it has additional context. It could be a bank account number, phone number, price, etc. All of these should be properly formatted for readability, according to the user's locale.

Fortunately, with `i18next` we can create `format` functions, which take the interpolated variable, a format (string we defined in the dictionary, next to the variable placeholder) and currently set language as arguments. We should place it in our `i18n.init` function:

```json  {numberLines: true}
{
  "date": "Date: {{date, MM/DD/YYYY}}",
  "price": "Price: {{value, currency}}",
  "number": "Number: {{value, number}}"
}
```

```ts  {numberLines: true}
i18n.use(initReactI18next).init({
  interpolation: {
    format: function (value, format, lng) {
      if (value instanceof Date) {
        return formatDate(value, format);
      }
      switch (format) {
        case 'currency':
          return formatCurrency(value, lng);
        case 'number':
          return formatNumber(value, lng);
      }
      return value;
    },
  },
  ...
});
```

As you can see, we can pick the right format function depending on what type the variable is and what format we want it to use. With dates for instance, we can use the `format` variable directly as a formatting pattern for some helper library like momentjs or dayjs. Then the format function can be as simple as that:

```ts  {numberLines: true}
function formatDate(date: Date, format?: string) {
  return dayjs(date).format(format)
}
```

And for formatting prices (or large amounts), we can use the build-in `Intl.NumberFormat`, which can handle adding proper currency symbol, and render the value using proper separators according to given locale:

```ts  {numberLines: true}
function formatCurrency(value: number, lng?: string) {
  return Intl.NumberFormat(lng, {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}
// -> (45123, 'en') => €45,123.00
// -> (45123, 'pl') => 45 123,00 €
```

With this approach we can keep all our formatting logic in a single place! Clean!

## Pluralisation

Great! We can now translate our content, inject formatted variables, but wait… What if we want to do "one more _thing_"? Or maybe even "a couple of _things_"? Pluralisation can be complicated, but not with i18next!

Whenever you need a different form depending on a number, there is a special `count` var, which you can use like this:

```json  {numberLines: true}
{
  "key": "{{count}} thing",
  "key_plural": "{{count}} things"
}
```

```ts  {numberLines: true}
t('key', { count: 1 }) // -> "1 thing"
t('key', { count: 5 }) // -> "5 things"
```

Nice and easy! However, things get a bit tricky when your language has more than one plural form, then simple `key`/`key_plural` won't be enough. For example, in Polish we have one singular and two plural forms. So in this kind of dictionaries we have to use the `key_index` notation:

```json  {numberLines: true}
{
  "plate_0": "{{count}} talerz",
  "plate_1": "{{count}} talerze",
  "plate_2": "{{count}} talerzy"
}
```

```ts  {numberLines: true}
t('plate', { count: 1 }) // -> "1 talerz"
t('plate', { count: 3 }) // -> "3 talerze"
t('plate', { count: 25 }) // -> "25 talerzy"
```

It might not be obvious which index goes where. Some languages like arabic have even 5 plural forms. So to help you finding the right `count` to `key_index` pair, there is a [special tool](https://jsfiddle.net/sm9wgLze) which you can use anytime. Keep in mind that `key_index` notation is reserved for languages like Polish and you can't use it in English.

There is also an extra [i18next-intervalplural-postprocessor](https://github.com/i18next/i18next-intervalplural-postprocessor) if you want to describe custom ranges:

```json  {numberLines: true}
{
  "key1": "{{count}} thing",
  "key1_plural": "{{count}} things",
  "key1_interval": "(2-7){a few things};(7-inf){a lot of things};"
}
```

```ts  {numberLines: true}
t('key_interval', { postProcess: 'interval', count: 3 }) // -> "a few things"
t('key_interval', { postProcess: 'interval', count: 21 }) // -> "a lot of things"
```

## Context

Sometimes we want to share common translation, that can be used with different contexts.
Use `t('key, {context})` with `key_context` to do something like this:

```json {numberLines: true}
{
  "findAPerfectFriend": "Find a perfect friend",
  "findAPerfectFriend_male": "Find a perfect boyfriend",
  "findAPerfectFriend_female": "Find a perfect girlfriend"
}
```

```ts  {numberLines: true}
t('findAPerfectFriend') // -> "Find a perfect friend"
t('findAPerfectFriend', { context: 'male' }) // -> "Find a perfect boyfriend"
t('findAPerfectFriend', { context: 'female' }) // -> "Find a perfect girlfriend"
```

## Overrides

On occasion, you may want to display something in a specific language e.g. you have a few buttons to change the app language and you want the user to see each of them in its own language. In such a case we can just override the current locale.

```json {numberLines: true}
{
  "switchLanguage": "Switch to English"
}
```

```tsx  {numberLines: true}
...
const {t, i18n} = useTranslation();
return (
  <Button
    onPress={() => i18n.changeLanguage('en');}
    title={t('switchLanguage', {lng: 'en'})}
  />
)
// -> 'switchLanguage' key will be looked up in en/translation.json first
...
```

## Objects and arrays

In all previous examples `t()` function was used to get the translation in the form of string. It doesn't always have to be the case. With the `returnObjects: true`option `t` can return objects or arrays.

```json {numberLines: true}
{
  "fruitList": ["apple", "banana", "raspberry"]
}
```

```ts  {numberLines: true}
const fruitList = t('fruitList', { returnObjects: true })
console.log(list instanceof Array, fruitList)
// -> true, ["apple", "banana", "raspberry"]
```

You also have a shortcut to get and join arrays at once:

```ts  {numberLines: true}
t('fruitList', { joinArrays: '\n' })
// -> apple
//    banana
//    raspberry
```

## Extras

There are a lot more options to talk about when it comes to i18next. I believe I covered here the essentials, used in the best possible way. If you want to learn more, there are [plugins](https://www.i18next.com/principles/plugins), usage with [CDNs](https://www.i18next.com/overview/getting-started#load-from-cdn), multiple dictionary files per language aka [namespaces](https://www.i18next.com/principles/namespaces) and more…

## Summary

`react-i18next` lets us develop fully internationalized apps in a modern way using hooks. We have TypeScript support, formatting support, the solution scales well, and we can split dictionaries, formatting and component logic.

I highly recommend it, even if you just stick to the basic usage and support just one language. If you decide to support more languages in the future, all you need to do is to translate a single .json file. This library never failed me and there is only one small thing that I miss. We have no way of type checking the variables/formats used in .json dictionaries. It would be nice, if I could have some enum e.g Formats, which I could use everywhere I need, or get an error if I'm trying to inject a variable, that is not going to be replaced anywhere.

But I'm not complaining! It is a pleasure to manage internationalization like that!
