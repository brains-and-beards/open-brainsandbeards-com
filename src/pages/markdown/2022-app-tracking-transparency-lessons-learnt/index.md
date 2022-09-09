---
path: '/blog/2022-app-tracking-transparency'
date: '2022-06-29T11:12:41.253Z'
title: 'Lessons learnt on App Tracking Transparency'
image: header.jpg
author: Wojciech Ogrodowczyk
---

While writing your mobile apps in React Native prevents you from a lot of platform-specific silliness, there's a lot you still need to face. One of such deadly traps is Apple's [App Tracking Transparency](https://developer.apple.com/app-store/user-privacy-and-data-use/) guidelines. Let's discuss what it means in practise for us - regular developers, just trying to go about our day, building the next "Foursquare for dogs" (Fursquare? 🤔).

## Why would I care?

The scope of us who care is pretty big. It includes everybody who publishes their apps to Apple's store and would like them to pass the review. You never know when you might face a rejected build.

### What does "tracking" even mean?

Apparently, different things to different people. Of course, the most important question to start us off would be what Apple thinks it means. Their definition is based on a couple of things:

- identifying users through any global (not your app specific) identifiers
- sharing their data with 3rd parties
- for the purpose of targeted advertising or advertising measurement

It seems pretty straightforward how to avoid having to show the AppTrackingTransparency modal - just don't share user's data with others and don't partake in targeted advertising. Unfortunately, it's not that simple as we'll soon discover.

### But it saves me from GDPR banners, right?

Well, no. Apple's definition of tracking is very particular and it doesn't fit with GDPR's idea of data protection. For example, Apple's only concerned with using the data for advertising purposes, while GDPR doesn't really care what you'd be storing the data for.

Unfortunately, you'll still need to abide by the Apple rules and display the App Tracking Transparency popup and then abide by the EU rules and show data protection information (and let your user choose whether they're okay with it). Also, as a side-effect of Apple's guidelines, they'd also like you to show the Apple modal first and only if the user accepts it you should show the GDPR one. This means that a user scared by the first one will never have a chance to opt-in to GDPR-compliant data collection.

### Okay, I track. What's the big deal?

If you find yourself fitting the Apple's criteria, you'll need to display the AppTrackingTransparency popup that shows your users a scary message about how you're apparently a creep that wants to follow them everywhere. So what?

- **Code complexity**. Once you do that, you'll need to support two paths for the user data - those who agreed and those who didn't. Usually the easiest way to do it is on the mobile app itself, because trying to limit sharing (or profiling) once you've sent the data to 3rd parties is like trying to put a cat back into the bag. Not likely to happen. And having to support the two flows will add to the complexity of your code.

- **A lot of people will refuse**. I've seen a lot of different numbers anywhere between 80% to 96% thrown around on how many people refuse the tracking request. The problem here is once they do, it also limits the tracking that you _could_ do if you did it in Apple-friendly way, because Apple will stop you from displaying your GDPR consent request.

- **You don't need it**. If you're only interested in the insights about how people use your app, you can still store this information without falling under the App Tracking Transparency rules. Just don't link your data with 3rd party databases, don't share (or sell) the data, and don't target users with ads. Then you're free to collect all you want (as long as you're GDPR-compliant).

### What do I do?

Don't track your users. That's the easiest way out of this mess.

### But seriously, what do I do?

If you really need this data, we have a few practical tips for you what to pay attention to:

- **Don't use IDFA**. The rule is about any "global identifiers" for your users (so email, phone number, etc. _that you would use to connect your user data set to somebody else's_), but the only one that Apple can easily control is IDFA they issue. Don't use it. Also, don't use other global identifiers to link user databases, it's creepy.

- **Use a reliable 3rd party partner**. Some SDKs by default ask for the IDFA, even if they don't really need it. This will get your app rejected unless you display the Apple's tracking choice modal. This mostly applies to older versions, most of the providers by now updated their SDKs to fix this issue.

- **Avoid Firebase**. If you use Firebase Analytics, you'll need to opt-out of the option to share your analytics data with Google. Also, make sure to [bundle a native Firebase library that doesn't ask for IDFA](https://rnfirebase.io/analytics/usage#disable-ad-id-usage-on-ios). We've also faced an issue with Google Tag Manager, because it bundled its own version of Firebase (with IDFA) and there wasn't much you can do about it.

### Note on app review process

First of all, it needs to be said that reviewing this stuff by Apple is really difficult. They have no way of knowing what's happening on your backend, so no way to really know what you're doing with user's data. That's why sometimes they might err on the side of rejecting a build that seems suspicious.

Secondly, there's a huge time limitation on the review process. I imagine it takes minutes only and the reviewer will not have time to ponder the exact legal situation in your app. I've witnessed once a reviewer of an app that I've worked on to force the App Tracking Transparency modal even though we abided by all Apple's rules.

But the review mistakes can go both ways. There's a [Hungarian medical information app](https://apps.apple.com/gr/app/eeszt-lakossagi/id1550970543) that explains that you need to enable tracking to be able to sign in (sic!) and refuses to work without it. Even though this violates both the Apple's rules and the GDPR, last time I checked it was still free to do that. Maybe due to COVID special rules, maybe due to unreliable review process.

### Conclusion

1. Don't track.
2. If you do track, own the data. Only use 3rd party providers that don't share it with anyone (but you).
3. If you can't own the data, make sure you have a solid (and tested!) flow for people who refuse, so they can still fully use your app.
