---
title: 'Successful Product Development, part 2: Feature Creep'
date: '2016-10-10T11:19:09.513Z'
path: '/blog/successful-product-development-part-2-feature-creep'
image: feature-creep.gif
author: 'Brains&Beards'
---

Time to tackle the first monster that lies off the path to a Great Product: the [Feature Creep](https://en.wikipedia.org/wiki/Feature_creep)!

#### **But first, let’s talk about scope**

Scope is a list of features that you want your product to have. In the beginning it always starts small, but then it usually grows to enormous proportions without you even noticing! How does that happen?

Well, let’s think of a hypothetical mobile app. Typically, you want the users to have an account, so you can keep their data separate. So, we’ll need an **authentication system **— one feature, right? But when we look closely…

- First, the user needs to **sign up** to use your service, so they need some kind of form to do that. And a **screen afterwards** to tell them everything went well. And you want to make sure their **email address is correct**, so you send a verification email. Then we need a screen that explains this process. Then you get an idea that maybe we’d make it simpler (Simpler? Hahaha) allowing them to **signup using their Facebook account**…
- With signup taken care of, we can focus on **signing users into their accounts**, so we **create a form** for them to put their credentials in. Then we check them and let them in, simple. Let’s also give them an option to **sign in with a one-use email link**. And a **fingerprint**! And not forget the **two-factor authentication**, it’s all the rage nowadays!
- Okay, now we’re surely done, right? Wrong, what happens when the user **forgets the password**? We need a screen for that as well, so they can let us know what’s their email account. Maybe throw in a **security question** or two, just to be sure? And don’t let them put the same answer twice, that would be dangerous!

See what I did there? So much work and our app doesn’t really do anything useful yet!

#### What’s Feature Creep?

This is exactly this **tiny influx of new ideas** finding their way into your product’s scope. New features creep up on you when you’re not paying attention and jump into your Trello boards, Excel spreadsheets, or JIRA tickets.

It’s natural that when you spend days and night thinking about what you’re building you’ll have hundreds of ideas. Probably dozens of them will be good and useful. **However, that doesn’t mean they all should make their way into the product scope**. Some of them might only be useful for just a tiny percentage of your users. And those which remain might be a great idea for later stages of your application. Remember to focus on the task at hand, so here comes in…

#### Minimum Viable Product

That’s a fancy modern name for the **simplest thing that could possibly work**. The concept of MVP is about making sure that you release as early as you can and the smaller your scope is — the faster you can deliver it.

The main benefit of releasing early is **seeing what the users do with your product**. You can watch them use it, gather data, and use it to make the decisions on what are the next features to implement. Instead of guessing what they might want, you actually can deliver what they need.

Remember, **MVP is usually much smaller** than you think!

#### But how do we cut scope?

It’s as easy as crossing stuff out! There are a few questions that can guide you on your scope-reducing mission:

- Is that feature **absolutely necessary** to deliver the defining value of the app?
- Can I do it **manually** instead?
- Is there a **simpler** way of doing that?
- What would need to happen if I **removed** that part?

Let’s say I’m working on an app that will let me get **perfect soft-boiled eggs** every single time. Let’s assume that this process depends only on these few variables: size of the egg, time you cook it, temperature of the water, etc. Let’s say we keep the temperature stable (boiling all the time) that leaves two variables for our app to work with: size and time. So, the idea is to first [weigh the egg using your smartphone](http://osxdaily.com/2015/12/12/turn-iphone-into-scale/) and then let it compute the cooking time using a patented algorithm. I already see myself showered with money by my future users!

So, we see what the core value is, now let’s look at more possible features:

- We could store the user information “in the cloud”, so that they can access the history of their boiled eggs.
- We could add a camera tab that lets you take a picture how the egg turned out and imprint cooking stats on top of that.
- We could add Twitter / Facebook / Instagram sharing, so our friends can join.
- We could add a screen afterwards here the user says whether the egg was too soft, too hard, or spot on. Then we could use this information to tweak the algorithm, so that next egg is closer to the ideal.

Amost all of the above are extra things that (although undoubtedly useful!) don’t really enhance the **primary experience **— eating the perfect egg. Apart from the last one on the list, that might be something we want to include in the first version. Should it be part of the MVP or can we deliver a good and useful product without it? The answer is up to you! Remember that every ruthlessly removed feature saves you days (or weeks!) of expensive development time and **reduces the time it takes to deliver the app**.

There will be more posts are coming in this series, so if you found that interesting — stay tuned!
