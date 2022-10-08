---
path: '/blog/2022-locating-styles-in-react-native'
date: '2022-10-08T11:12:41.253Z'
title: 'On separating style from components'
image: header.jpg
author: Wojciech Ogrodowczyk
---

When working with other people's code in React Native sometimes we see the components following a pattern where you'd have a folder (for example `MyComponent`) and inside three files: `MyComponent.tsx` that contains the JSX code, `styles.ts` with styles for the component, and an `index.ts` to make the component easier to import. I've explained quite a few times by now why this pattern is less efficient than just simply putting styles and JSX code together in one file. I've did that often enough that here we are - me writing a blog post that I can link to next time to avoid repeating myself ;)

## Amount of files

Of course, it's a personal preference whether we'd rather keep everything close to each other (and hence deal with larger files), or we'd rather have multiple smaller files. If this would purely be a matter of preference (two smaller files vs one bigger file), I'd have no problem with that. However, in that case we need to introduce extra _waste_ in form of:

- A new folder to hold the component files that increases (usually already deeply nested) file tree that we work with
- An `index.js` that offsets the problem we introduce by adding the folder and that lets us write shorter `import` statements

## Staying in the flow

If you strive to keep your presentational components separated from you application logic (as a lot of us do), you'll have two types of components:

- Holding rendering logic, without any styles. What would you do in that case - keep them (unnecessarily) in a separate folder with their own `index.js` file for consistency, or in a single file for simplicity?

- Presentational, where the styles are crucial. Most of the times when you'd open a presentational component (either to check something, or modify), you'd also be interested in the styles. Keeping both together will save you time (over having to jump between the two separate files).

## Automatic checks

Finally, the most important argument for me is about running automatic checks. If you keep your styles located in the same file as the component, there's no need to export them, which makes it _a lot_ easier to automatically check whether all of them are actually used.

There's an `eslint` [rule for that](https://github.com/Intellicode/eslint-plugin-react-native/blob/master/docs/rules/no-unused-styles.md). Unfortunately, if you decide to separate styles from your JSX code between two files, it won't be able to check them for you. Once they're exported (rather than a local variable), it's much harder to keep track where they're used. This eslint plugin won't be able to help you.

## How come people still do it then?

As you can see, I don't really see this issue as a tradeoff, but rather an obvious advantage for keeping styles together with JSX. The question arises, though - why people still keep splitting them?

I think the reason for it is _back in the days_ among web developers there was a big push to move away from inline styles in your HTML elements towards building re-usable stylesheets. This idea was often simplified to a piece of advice that you should keep your HTML and CSS apart. I think this approach has originated then and trickled down eventually to React Native, brought by web developers starting mobile projects.

However, with React Native the components are not HTML and the styles are not CSS. It's all JavaScript and you don't need to move a stylesheet to another file to keep things tidy.

## A word on styled components

You might want to ask whether this whole discussion still applies if you're using one of the several styled component libraries. Well, I don't really know. Although I do like the idea of styled components, when I tried some of those libraries in the past, I wasn't satisfied in the ratio of learning curve and extra syntax over daily benefits. I don't see them often enough in the wild to form an opinion, sorry.
