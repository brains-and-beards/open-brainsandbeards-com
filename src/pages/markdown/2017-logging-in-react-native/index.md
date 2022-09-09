---
path: '/blog/logging-in-react-native'
date: '2017-05-22T06:07:36.182Z'
title: Logging in React Native
image: typewriter.jpeg
author: 'Wojciech Ogrodowczyk'
---

A couple days ago I was working at a client’s office, pair-programming alongside the [coolest dog I’ve ever met](https://twitter.com/beppocalypse), and I got asked a simple question: **what’s the proper way to log** in React Native?

That’s a perfectly good question, especially coming from somebody who spent a long time in Java environment where [there’s a gold standard](https://logging.apache.org/log4j/) for it. In JavaScript it seems like the gold standard is just simply to _console.log_ things.

I gave it a bit of thought and wrote down what logging options we get in React Native straight out of the box and whether we need anything else.

#### Reading logs

Before we dig into various ways of writing to our application log, let’s go through the options where we can read them first.

1.  **JS debugging browser**. We can see the JS logs in the _console_ section of the developer tools in the browser we use for remote JS debugging. Of course, we’ll only see them when the debugger is connected and this slows down the execution of the application significantly.
2.  We can use the commands **react-native log-ios** and **react-native log-android** to get real-time access to all the logs coming from our device, including what we explictly logged using _console.log_. It doesn’t slow down our device and also offers more information, as we get to see what’s going on in the whole application, not just the JS thread.

![Logging techniques are older than computers.](typewriter.jpeg)

#### Writing logs

Writing logs is simple — whatever you output to the console log, it’ll get displayed in the application logs, both in the remote debugger as in the device logs that React Native (or Xcode / Android Studio) show us.

There’ just one thing I want to draw your attention to: using the proper log level. Apart from _console.log_ we also have _console.warn_, _console.info_, and _console.debug_. It makes sense to use all of this diversity, so I use them for different purposes:

I use _console.warn_ when something unexpected happens. Those could be edge cases that I haven’t gotten round to implementing yet,or a server response that technically isn’t completely wrong, but definitely looks fishy.

_Console.info_ is for letting me that particular events that I expected to happen went on as expected. For example, I might want to log list items one by one as they’re being (re-)rendered.

Finally, _console.debug_ means that it’s just a temporary (meaning I’ll remove it as soon as I figure out what’s going on) log that I need for my problem-solving process. Those won’t be even committed to a repository.

Committed to repository? I can see already an important question raising:

#### What about performance?

All those _console.\*_ calls are synchronous and take away valuable computing time from running the code that matters. How do we make sure that it doesn’t degrade the performance of our released application?

There’s a simple trick. We configure Babel to remove all _console.\*_ calls for release builds. This way we can keep our development environment full of information logged, without impacting the performance of the final application. It’s easy and you need to [add some configuration to your .babelrc file](https://gist.github.com/sharnik/eede0a1fc0bfd44bb40c7b444db8d549).

#### So, do I really need a proper logger?

I „grew up” programmatically in an environment where logging was important. I was working mainly on backend systems and keeping info on what’s going on your server is pretty important. Especially when something goes wrong and you’re trying to figure out why. Then, having a log of what happened just before was priceless. However, working on mobile applications, it’s different.

Most importantly, when something goes wrong, we won’t see the logs anyway. They’d be stored on a client’s machine, out of our reach.

So, we’d only read the logs while developing and then we have more tools at our disposal — we have the context of what we’re doing (because we’re the ones who are interacting with the app), we have tools to track what’s happening in our Redux stores, etc. So, in such a situation using a simple _console.log_ is perfectly adequate.

#### Want more development tips?

Finally, if you’re looking for more development tips, you should check out [Brain Picks ](http://brains.zone/brain-picks)— a video channel where we use screencasts to share actionable tips and techniques that will help you develop better applications faster!
