---
path: '/blog/building-cross-platform-teams'
date: '2017-11-15T09:15:37.286Z'
title: Building cross-platform teams
image: fence.jpeg
imageCaption: 'Picture by <a href=https://picjumbo.com/about-viktor-hanacek>Viktor Hanacek</a>'
author: Patryk Peszko
---

There is a lot of good stuff to discover in React Native world. Especially for people coming from native development. You’ve heard probably about hot reloading, easy component styling, clean reactive programming and its open-source, fast-evolving tooling.

For me, however, the most exciting thing about React Native, is how it can help scale your mobile development teams.

Let me start with a story first. You might have experienced parts of this tale already yourself, dear reader.

The story starts with an idea of making an app. There is a set of user stories. You captured some requirements inside Confluence pages. And soon enough, there is the first feature to implement. Of course, your idea is excellent, and it has to appear on iOS and Android at the same time. Therefore you have at least one Android and one iOS developer in the team. You meet with them, discuss the feature, and together you find out if it can be improved in any way (if you don’t take all your team feedback, you’re leaving a lot of value on the table).

At this point, both developers received the same information and have a similar understanding how to implement the feature. Yes, it is a simplification, but I wanted to write you today about technical aspects of cross-platform development, instead of people patterns and communication. Unfortunately, this is the first and the last time when the storylines of the two developers and the app are converged.

What happens next is the key to how your project is going to look and scale in the future. Most probably your developers are going to split, go to their desks, open Xcode and Android Studio, and start working on their own.

In the worst case, the next time they will be talking to each other about the feature is next sprint planning. The separation is even more likely to happen once you start to have more developers in the team. The lack of communication will lock information exchange inside the platform teams. At this point, your feature’s implementation an **Android and iOS will begin to diverge from each other.**

> The number of different solutions to a problem is equal to the number of developers in the room.

Each developer will implement the feature a little bit different. Of course, you will test it, and at the end, the functionality will appear the same to the end user. You didn’t forget to check all those obscure edge cases, did you?

With every new feature, you will find a bigger divergence between the apps. It just adds up. There will be more and more edge cases and bugs which will appear only on one of the platforms.

Usually, teams have processes in place which helps to implement features in a specific, agreed upon, way. This makes knowledge transfer quicker and improves code review outcomes.

But those processes are usually platform-bound. Which iOS developer reads and comments regularly peer’s Android code? It is no wonder it doesn’t happen. Nobody wants to slow down teammates asking “beginner” question (this is not true, you should ask beginner questions more often, it will greatly improve your skills and the skills of the explaining person!). “_Android is written in a language I don’t understand, and their framework is confusing_”.

Soon enough, next time you want to get an estimation for a new feature, you will get a considerably different number from both platform teams. Why? Well, they are having at this point a **very different code base**. Something which can take hours to implement on iOS can take days in Android (or another way around, let’s not start a war here ;) The different architecture choices from the past come back now in the form of varying complexity to move forward. It’s easy to grasp that this can be fast a major planning and grow’s pain.

It doesn’t have to be that way though! And this is for me the crown jewel of React Native. React Native is one of the best ways how to **share code between two platforms**.

Sharing the code is the key here. Of course, you won’t be able to share 100% of the code. There will be some percentage of unique UI code which will be a bit different between platforms. In the end, Android and iOS devices are physically distinct, and this has to be reflected in code somehow. But you will be able to share nearly 100% of the business logic implementation. This logic is probably as well the place, where you find the most edge cases and bugs. You can replace Swift and Java with JS as a standard cross-platform language. A common language which now your **whole** your team speaks. If JavaScript is not your cup of tea, don’t worry about it. There is a bunch of other languages you can pick. Check [Wojciech Ogrodowczyk](https://medium.com/u/8d58addab3eb)’s blog post (and video) about it here:

[https://brainsandbeards.com/blog/speaking-at-react-alicante](https://brainsandbeards.com/blog/speaking-at-react-alicante)

With that in mind, it’s easy to imagine, that all your developers leave sprint planning room not to sit separately, but to come together and write one code for both platforms. It enables everybody to participate in code reviews, encourages helping each other and exchange of information. In the end, everybody feels in the same boat and responsible for the whole app. This is great for teambuilding as well. No more platform silos. The future of tomorrow is already on your doorsteps.

Of course React Native has its problems, don’t trust anybody pretending it doesn’t. But it solves the team scaling problem almost by itself, and this should be worth a lot for every company in the long run.

If you liked the post, please consider sharing it, it means a lot to us ❤️. Stay positive and have an amazing day ᕕ( ᐛ )ᕗ
