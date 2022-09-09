---
path: '/blog/our-experience-with-react-native'
date: '2017-09-14T15:56:12.546Z'
title: Our Experience with React Native
image: field.jpeg
author: 'Wojciech Ogrodowczyk'
---

Since we started working with React Native almost **two years ago**, we worked with different clients on a **variety of applications**. It’s a good moment to write a short summary of what kind of companies (successfully) use it and analyse **what worked** for them.

We’ve worked on an **R&D project for a big German company**, delivered a **startup from zero to an MVP**, joined two teams to help them learn what the **best practises** are and set them on the right path, **re-wrote two native applications** (for iOS and Android) into one React Native codebase that allowed a company to **move the mobile development in-house**, even without dedicated mobile developers, and finally worked on a **COSU (company-owned single-use)** device **for** **medical industry**.

Here’s a few common patterns that we spotted:

#### Static typing helps

We have our opinions about whether static typing helps (It does. A LOT.), but ultimately the final say is on the customer’s side. Whenever they can see the benefit, we’re happy to introduce static types, whether to an existing legacy code using Flow, or starting a project from scratch with TypeScript. Either way, we have seen direct benefits in form of **less bugs found** in the releases.

![Dynamically-typed giraffe roaming the streets of Paris. Photo by Chris Barbalis.](giraffe.jpeg)
[photo link](https://unsplash.com/photos/qBUQU4M38Xs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

One particularly enlightening situation happened when we were just showing to the client how to add static typing to their existing codebase. We’ve added Flow and just two type annotations in the smallest, simplest file we could find — just to show how the process works. Suddenly it started showing errors, which we thought were configuration issues in the first moment. However, it turned out that already we found a bug that would be really difficult to track down at runtime. No need to say, the client was instantly sold on the idea!

#### Team matters

We think that one of the most important strengths of React Native is **bringing the teams together**. Unfortunately, in a lot of companies the two mobile dev departments sit separately, not really sharing any knowledge (not to mention code!) with each other. Working together on one code repository and sharing most of the code changes that dynamic completely.

If somebody fixes a bug, they do it for two platforms at once. There’s no need for two developers getting intimate with some obscure user tracking tool (or a payment processor API), when only one would suffice.

In some cases, React Native even makes it possible to launch applicatons for a team with virtually none mobile development experience! We’ve helped out teams like that, guiding them through quirks of XCode and first App Store submissions until they were comfortable iterating on the project by themselves.

Of course, the kind of application that they will write by themselves will be limited both in scope and user interface, but as the popular quote says: “90% of applications just fetch some JSON and display it as a list”. You don’t need to write any native code to do that anymore and sometimes a polished user interface is not necessary (for example when you’re working on an internal tool).

#### Automation matters

Whenever we work with a client, we want to make their (and ours!) everyday development experience better than it was before. Usually that means starting with [fastlane](https://fastlane.tools/). In the beginning there’s some curiosity, maybe even a little pushback why we want to invest time in it when they already know how to deploy to the application store. However, the moment they see the first automated deploy, the whole perspective changes.

Although offering a mobile application is more of a process than a product (you need to update it with new OS releases, adjust content, fix bugs, etc.) some of the clients we work with don’t plan on hiring a dedicated mobile developer, but rather maintain the application in-house with the team they already have. In that case it’s especially important to make sure that when we hand over the project it’s equipped with a suite of automatic tests that make maintenance as easy as possible.

Fun fact: we even worked with a team that went that far as to tag their commit messages with emojis ([gitmojis](http://gitmoji.com)) that (when parsed on the CI server) would trigger a release of new version of the application!

#### Knowledge exchange matters

As most of the clients we worked with wanted us to deliver a project that after the contract ends they’d be maintaining themselves, doing a proper handover is really important. What makes it more difficult is the fact that hardly any of them had experienced React Native developers on staff. So it was crucial for us to also provide training in this matter.

What we ended up doing is pair-programming the simpler parts of the application with them. You don’t need to show them how to setup Redux from scratch, but it’d be useful for them to now how to pass extra parameters to their reducers. In such case the easiest way of getting them up to speed is just some old-fashioned pair-programming.

This technique not only transfers knowledge in a really quick way, but also boosts their confidence and lets them get a perspective on what kind of changes in the application they’re capable to perform themselves.

#### Finally, money matters

It’s clear that a lot of companies try React Native hoping they’ll save money. It’s two applications for the price of one, amirite? However, it’s not that simple.

I remember reading on Twitter once that “**React Native is a great tool for delivering bad mobile applications fast**” and there’s a lot of truth in that. If you want to have a really polished application with custom animations on every step and every interaction perfectly planned out, **you’ll have to invest a lot of time** in it. There’s no way around it. And the fact whether you’re writing the code in JavaScript or Swift won’t matter that much.

![In any project the last 20% of work always takes the longest. Photo by Martin Reisch.](field.jpeg)

[Photo link](https://unsplash.com/photos/y6fTK4k2J6c?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

You need to remember that behind those perfectly-designed applications that we so love to use as examples stand big teams of engineers. Did you see Facebook’s mobile application sound sample kit? There’s probably a person working full-time just on that. On the other hand of the spectrum, there’s a limit on what can be achieved by just a couple of developers on a deadline. But **React Native helps push this boundary** and lets you deliver a _90% done_ application much faster.

Also, there’s a lot of problems that don’t need a polished solution. Maybe you’re developing an internal tool for your company. Or a proof-of-concept of an idea to test it with potential users. An MVP of your product. All of those are valuable even when they’re only _90% done_.

#### Key Takeaway

Obviously, **there are no silver bullets**. So, what kind of organisations could make a good use of this technology?

1.  As I mentioned, one clear usecase is **R&D** work, putting out a **prototype** in front of your users, **MVPs** that you need to deliver on a **tight budget**, etc. Anything that falls into the “**quick & dirty**” domain would benefit from React Native projects producing value really fast. Apart from the obvious usecase of a startup with a small budget and big dreams, this kind of work can be useful also for bigger organisations. To give one interesting example, **Meetup**’s recent mobile redesign was based on a **series of design prototypes built in React Native**, tested with users and finally re-written into native code to fit their application codebases.
2.  Organisation that **wants to bring their mobile team working closer together**. There are companies that gradually add React Native parts into their native applications and from our experience this process brings much more **colaboration** between different “platform departments”. This might be just a side-effect of adopting a cross-platform technology, but a very beneficial one. In such case React Native can be of use for non-critical parts of the application that don’t need that much interface polishing, for example editing settings, user data, invoicing, etc.

#### What about us?

Currently in **Brains & Beards** React Native work makes about half of our business and we want to keep it that way. We see the value it brings to a certain type of client, but it’s also clear that you **need (real) native mobile development experience** to know how **to** **build a good aplication** with it.
