---
path: '/blog/were-all-cross-platform-developers'
date: '2018-01-22T18:05:16.708Z'
title: We’re all cross-platform developers
image: cross_platform.jpeg
author: 'Wojciech Ogrodowczyk'
---

I’m not joking. Most of us work on products that are available on multiple platforms: web, iOS, Android, sometimes even desktop! The fact that every platform is developed “natively” by a separate team, in a different technology, and in complete isolation from the others, doesn’t mean you’re not making a cross-platform product. It just means that you’re doing it in a really inefficient way (if you want an idea how to do it better, you can read [Patryk’s post on building cross-platform teams](/blog/building-cross-platform-teams)).

As you can see, this whole _cross-platform thing_ is not really a niche fad that we can just ignore and wish away. So, instead, let’s dive a bit deeper into what it is and dispel some misconceptions that seem to be really popular.

![Navigating cross-platform ecosystem ain’t easy.](cross_platform.jpeg)

#### It’s just webviews and HTML

This one’s a dismissive opinion that people use as a basis to claim later that there’s virtually no difference between cross-platform apps and web apps and that performance is terrible.

While it is true, that solutions based on webviews suffer from performance limitations and have trouble imitating “native” user experience, they form just a subset of choices for cross-platform development. [Apache Cordova](https://cordova.apache.org/) / [Adobe PhoneGap](https://phonegap.com/) and [Appcelerator / Titanium](http://www.appcelerator.com/) are I think the most popular ones in this genre.

There’s however a lot of different tools that don’t suffer from the _webview tax_ and have comparable performance to natively developed applications.

#### But it’s still just JavaScript

Nothing farther from the truth. There’s a bunch of small _sub-myths_ here:

#### JavaScript is terrible

Well, there’s JavaScript and modern JavaScript. If the last thing you wrote in JS was a JQuery plugin, you might want to revisit the ecosystem, because _oh boy, how it has changed!_ When you start automatically formatting your code with prettier, get a sophisticated linter setup to correct your mistakes as you type, and start using the new ES201X goodies, you might change your mind.

JavaScript has come a long way and is getting stronger every single day.

#### Still, it’s just JavaScript

No, not really. If seeing another _undefined is not a function_ error message would trigger a really bad trip down the memory lane, I’ve got good news for you. Nobody forces you to write JavaScript.

Here are a few choices that you can use instead:

- [Xamarin](https://www.xamarin.com/) is development platform allows you to write C# that targets the most popular mobile platforms. It’s been recently acquired by Microsoft and completely opened. Microsoft even recently released some [really cool tools](http://appcenter.ms/) that support Xamarin as well (apart from the usual “native” platforms).
- [Flutter](https://flutter.io/) is a fairly new framework that targets both iOS and Android where you use Dart to write your applications. It’s been developed by Google and has recently been made public and advertised.
- [React Native](https://facebook.github.io/react-native/) seems like a poster child for both the new-wave cross-platform framework and for writing modern JavaScript. However, React Native is much more than a JS framework, it’s a platform that lets you write your mobile applications in any (in theory, at least) language that compiles to JavaScript. In practise, there are successful teams delivering React Native apps in Clojure or OCaml (with Clojure being obviously much more popular).

Finally, you can also go cross-platform with native code, how crazy is that? For example, [Kickstarter](https://github.com/kickstarter/) adopted a similar, RX-based architecture in both their iOS and Android applications and it allowed them to share a lot of \_knowledge\_ between the teams. Even if the code is not shared, it still makes it much easier for developers to switch between the two teams.

### Okay, but only native solutions offer native UI

Well, kind of. Maybe. It doesn’t matter. Again, we’ll have two split such statements into two different, smaller, myths.

#### The UI decides how great the application is

This one’s really popular among developers. We like to take pride in our work, craft beautiful animations and obsess over details. However, a lot of times we forget what’s the value of the application. **It’s what** it allows the user to do, **not how**.

If I have an ugly application for health monitoring that increases my chances of fighting cancer, I don’t care whether “the navigation transitions don’t feel native”. What I care about, is my health.

I think as developers (and even more so, designers!) we overestimate the value that “real users” pay to those details we like obsessing over. Of course, there is a lot of cases where the user will get annoyed by the lag between tapping a button in a webview-based product, but most of them won’t care (or even notice) if you choose a “wrong” button tap animation in your React Native app.

#### Okay, but if I want the best UI, I need to go native

In theory, yes. To quote one of the conference talks I’ve seen this year: „**You can’t paint a picture of Morgan Freeman that looks more like Morgan Freeman than Morgan Freeman**.” The native apps are the „gold standard” of mobile applications nowadays and you can’t be more native than native.

In practice, however, the main factor that influences the final quality of your app is your team and its motivation. If they focus on creating the best possible user experience, it’ll be great, no matter the technology used. If they don’t, going native won’t change much.

My favourite example is when Microsoft rewrote their Skype application in React Native. Obviously, I don’t know what were their reasons and how they judge this decision from their point of view. However, I use Skype a lot, both before the rewrite and after, so I have a very good perspective on the user’s point of view.

The most surprising changes were that both performance and user experience improved **enormously**. How can that be, you might ask, if the codebase changed from native to React Native? Well, I guess is that the team priorities have changed. The old version had a lot of performance issues on middle-range and slower Android devices. This led to crashes, lack of responsiveness, overall horrible user experience. When rewriting I assume a lot of effort was paid to make sure that application feels fast for all the users, not just the ones on the newest phones. This led to a dramatically better product.

(Yes, I know that the new design is… surprising. Yes, I haven’t met anybody that likes it. No, I don’t really care.)

#### Are you saying native apps are going away?!

No, of course not. I’m not saying „native apps” are becoming obsolete, just that they’ll become more like artisan crafts.

They might be higher quality, more customisable, but also more expensive and that’s the bottom line for a lot of businesses. Once cross-platform solutions get good-enough (arguably I’d say the time is _now-ish_), most of the businesses is going to move towards them.

The same way hardly anybody creates custom-made blogs, or writes their own ecommerce platform, mobile development will commoditise. We’ll have off-the-shelf products that we can use to jump-start our applications. And, guess what, they’ll be cross-platform!

Native apps will still be around, the same way cobblers are, but less companies will need them. The same way most people buy their shoes from a factory. Or get their music as a digital download, instead of a vinyl record.

Developers will complain, because there’s a lot of ego on the line. We like to think we’re working with “the best possible tools”, delivering “the best possible user experience”. And, unfortunately, we like looking down at other developers. The same way a lot of Ruby developers take pride in the fact they’re not using PHP, a lot of native developers talk about JavaScript. But in the end it’s the product that you created that matters.

Finally, native development will always be a better choice if you bill hourly!
