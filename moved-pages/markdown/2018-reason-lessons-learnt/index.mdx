---
path: '/blog/things-i-wish-i-knew-when-writing-my-first-reason-react-native-app'
date: '2018-09-05'
title: 'Things I wish I knew when writing my first Reason + React Native app'
image: barcelona-icon.png
author: 'Wojciech Ogrodowczyk'
---

I’ve recently written a small mobile application using React Native and Reason. Usually, I use React Native with TypeScript and I wanted to try out if I can get more value out of a stricter type system.

If you’re interested in how it all ended up, the best thing to do would be to [get the code](https://github.com/brains-and-beards/barcelona/) and play with it yourself. The application is small, so it should be very easy to find your way around, change a few things and see how that feels. You can also [get the iOS version directly from the App Store](https://itunes.apple.com/us/app/brains-barcelona/id1431909667?ls=1&mt=8) to see how it turned out.

<div className="wrap-left">
  <img src="barcelona-icon.png"/>
</div>

In this blog post I won’t be discussing whether using Reason is a better match than TypeScript for React Native applications. It’s an easy answer: it depends ;) One day we’ll probably get into the pros and cons of such a solution, but not today.

Instead, I wanted to **write down a few tips** that I wish somebody shared with me when I started working on the app. I hope it’ll be useful for people **starting on their first React Native + Reason application**.

## Breaking changes

First tip would be to book enough time to build a finished thing. If you keep pausing and resuming the development much later, you’ll spend a lot of time **updating the code you already wrote** to work with the current library versions.

I made a mistake of starting the project when I didn’t really have any free time available and I ended up working on it on and off for almost a year. I think around half of that effort went to catching up on the newest `reason-react` and `bs-react-native` versions and updating my code to work with them.

## Handling styles

There are many ways to handle styling of components in React: you can use inline styles, have a style object defined in the same file as your component, have a separate style file matching every component, using helper styling libraries, etc.

I found most of the things I tried a bit verbose and eventually settled on a (not ideal) way of keeping a **style object alongside my component code**. Feels like typing the word `style` a lot, but I didn’t come across anything significantly better.

You can [see how it works in practice](https://github.com/brains-and-beards/barcelona/blob/master/re/Details/RecommendationDetails.re) in one of the components.

## Searching for things

First lesson is that there’s not that much Reason-specific material available, but that’s not a big problem. What ended up working for me pretty well was looking for an OCaml solution for the problem that I have and porting it to Reason syntax. Usually it was just a matter of finding a standard library method that does what I want.

An issue a lot of beginners hit straightaway is how to do **type casting/conversions**. For basic types there’s a lot of conversion helpers available with an easy to remember naming. For example to create a `string` out of an `int` we use `string_of_int`.

Another surprise that I think is fairly common in the beginning is that **mixing different numerical types** is not possible. You’ll need to get your types to align properly before you do any mathematical operations. Probably, you’ll be converting `int` to `float` to keep the decimal precision. You can do it following the above pattern: using `float_of_int`.

Another thing I ended up looking up a lot was [methods that operate on Strings](https://reasonml.github.io/api/String.html) and collections — both [Lists](https://reasonml.github.io/api/List.html) and [Arrays](https://reasonml.github.io/api/Array.html). If you get confused with the latter and find yourself passing Arrays instead of Lists and _vice versa_, remember about the `Array.to_list` and `Array.of_list` methods.

![](barcelona-intro.png)

## Dependencies

When you plan _what_ to build, make sure you don’t go crazy with the scope of your project. Remember it’s not like the JavaScript ecosystem where you can easily use helper libraries for almost anything. There are **BuckleScript ports of many JavaScript modules**, but this process of porting libraries has just started and you should expect to have to write some bindings yourself.

It’s hard to avoid using external dependencies, particularly because of the state of **navigation in React Native**. Similarly like nobody uses the navigators that are present in React Native itself, you shouldn’t expect any help from `bs-react-native`. In my case, I forked a repository with an experimental navigation solution, updated it to use the newest (at the time) `bs-react-native` and **vendored a slightly changed version along with my app**.

Nowadays it should be much easier due to [rebolt-navigation](https://github.com/callstackincubator/rebolt-navigation) being available. However, I haven’t tried it personally, so can’t say much more than that it’s probably worth checking it out.

## Falling back to JS

Remember that one of the ideas behind Reason is easy interoperability with JavaScript, so **don’t be afraid to fall back to what you know** when you hit a problem.

For example, you can use a common debugging tool — console logging with `Js.log`, or in the beginning you might want to use the familiar JavaScript methods for string manipulation, like this:

```
let newName = Js.String.replace(“,”, “”, name)
```

## Strings

**Unicode support** is pretty bad in Reason, so you’ll have to **use some BuckleScript magic** to transform your Reason strings (encoded in UTF-8) to work well in JavaScript (expects UTF-16). Although it’s fairly easy, personally I find it really annoying to have to define strings `{js|w taki sposób|js}` just because I want to use a _foreign_ character.

Lastly, you might want to use a similar trick to get **template strings in Reason**. Assuming you have declared `foo` and `bar` variables, you can use them inside a string by writing `{j|Foo is: $foo, while bar is: $bar|j}`.

## Summary

The whole process of writing the app was still a lot of fun and I’m looking forward to building the next one. Hopefully, after reading the above tips, your first Reason + React Native app will go even smoother!

If you read all the way till the end that means you probably should subscribe to our blog to read more posts like that. We have some work content about Reason coming up, including a screencast and a write-up about adding a small feature to a Reason + React Native app. Stay tuned!

---

If you liked the post, please consider sharing it, it means a lot to us ❤️. If you’d like to contact us with any questions or comments, you can [find me on Twitter](https://twitter.com/sharnik), or [visit our website to send us an email](https://brainsandbeards.com/).

Stay positive and have an amazing day ᕕ( ᐛ )ᕗ
