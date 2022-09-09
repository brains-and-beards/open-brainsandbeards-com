---
path: '/blog/should-you-learn-react-native'
date: '2017-01-09T19:14:37.510Z'
title: 'Should you learn React Native?'
image: graduation.jpeg
author: 'Wojciech Ogrodowczyk'
---

I’ve recently taught a React Native course at La Salle Campus](https://www.salleurl.edu/en) of the [Universitat Ramon Llull](http://www.url.edu/en) in Barcelona. They offer a [master’s degree in Apps Design and Development](https://www.salleurl.edu/en/education/master-software-development-and-architecture) and as a part of it there’s course where students compare different solutions for creating mobile applications. They write native Android apps in Java, iOS ones in Obj-C or Swift, as well as cross-platform in C# using Xamarin and in JavaScript using React Native.

After the course, I got an interesting question: „Why should they learn React Native if they’re already learning Xamarin? They both serve the same purpose and the amount of job offers clearly shows there’s more need for Xamarin developers.”

I started writing down the response and soon realised that it calls for much more than an email, being a perfectly valid question and touching on various different points. So, here’s my answer, touching various points mentioned.

#### There are no jobs offers.

Yet.

Keep in mind that we’re talking about the job market and tech community in Barcelona, which is much more conservative than what we’d see in the Silicon Valley, or even [Silicon Roundabout](https://www.theguardian.com/cities/2014/mar/10/slow-death-of-silicon-roundabout). Although there are big companies like Amazon, Baidu, Walmart, or Airbnb that are betting on React Native, none of them will offer you a 9–18 (that’s a typical work schedule in Barcelona) office job here.

I have to admit I haven’t checked how many Xamarin offers there are exactly, but I’m sure they exist. It’s also natural that students worry about where they will work after graduating, but what they’re missing is that they should prepare for the world of tomorrow, not today.

**So, personal story time:**

I made an early bet on technology myself, when I was still at the university. When I started learning Ruby there were no job offers for it at all in my country. But I liked using it, I liked the productivity it gave me, and the simplicity of the code that I got. When I graduated and started to look for work, there was literally one job offer in my city. And I got it.

(_There was also one offer in Spain at the time. A long dead_ [_tourism startup_](https://twitter.com/trourist) _was looking for a Ruby on Rails developer with a 500€/month salary. In Donostia._)

Terrible job market aside, this early start gave me a lot of interesting experience, I got to know and work with some very smart early adopters, and I settled easily into the growing local Ruby community. When I think of how my career would go if I got a Java job instead (like most of my classmates), I’m really happy with the bet I made.

**To sum up**: when you graduate and enter the job market in an established field, you’ll be competing for the same job offers against hundreds of other graduates, as well as many already experienced candidates. Entering a new field allows you to stand out more. And experience counts double if you’re an early adopter.

Also, I have already seen companies in Barcelona hiring React Native developers and I’m sure this trend will grow really fast. The React Native hype seems similar to the attention Ruby on Rails got years ago.

#### Xamarin and React Native are too similar

True, they may serve the same purpose, but they fit different needs. For some reason, Xamarin is used mainly in corporate environments, while React Native is adopted by the startup community.

It could be because C# fits easier into corporate coding standards and workflows while JavaScript’s mentality of „let’s try to build quickly something that works” is much more in line with building MVPs to test na idea out quickly. For some reason, at [Brains & Beards](http://brainsandbeards.com/) we haven’t yet met anyone that would be hesitating between the two choices.

The whole situation reminds me of the old (and outdated) [Mac vs PC](https://www.youtube.com/watch?v=0eEG5LVXdKo) advertisements. You should try them both, see which community you feel more comfortable with and stick to it.

Also, React Native and Xamarin follow **different programming paradigms**.

Xamarin’s develpment model is based on the object-oriented programming model, while React Native tries a Functional Reactive Programming approach. Learning its Redux-based architecture will also help you understand how FRP programming is applied in different programming environments. I’m hearing more and more about popularity of RxJava for Android and [various](https://github.com/ReactiveCocoa/ReactiveCocoa) [different](https://github.com/ReactiveX/RxSwift) reactive frameworks for iOS development. All of them are easier to understand after you spend some time developing in an environment heavily constrained to FRP, such as React.

![All the candidates applying for that Java position you found.](graduation.jpeg)
All the candidates applying for that Java position you found.

#### Javascript

The fact that React Native is rooted in JavaScript hasn’t came up in the question, but is still important enough to mention.

On one hand, JavaScript is a language that is still figuring out its own syntax, it’s evolving so fast that a term „JavaScript fatigue” was born (_it means not being able to keep up with the changing ecosystem and all the new tools being created_) and plenty of programmers have good reasons not to want to use it in any serious project.

However, it’s also becoming a really popular _compiling target_ for other languages. Apart from _hundreds_ of languages that were created especially for the purpose of offering a better experience to JavaScript developers (like [CoffeeScript](http://coffeescript.org/)), there are more and more languages that just offer it as a side option (like [Haskell](https://wiki.haskell.org/The_JavaScript_Problem), [Ruby](https://github.com/opal/opal), or the most important for React Native development —[ Clojure](http://clojurescript.org/)). This allows us to choose React Native as our mobile development _platform_ without having to choose JavaScript as the _language_.

#### Final thought

- The React community is one of the fastest growing programming communities right now. It’s [on the web](https://facebook.github.io/react/), it’s [on the mobile](https://facebook.github.io/react-native/), even [on Windows, TVs, and XBoxes](https://blogs.windows.com/buildingapps/2016/04/13/react-native-on-the-universal-windows-platform/#gTXTwJTPOv0PATIi.97).
- The concepts it introduces (declarative UIs and FRP) are highly valuable to any programmer.
- Upcoming ability to choose the language you want to program in.

Those were the selling points that convinced me to take up React Native. Whether it’s something that you care about, that’s your decision.

#### Sidenote

There’s also a simpler, shorter answer that I’d heard from one of my university professors back in the day:

> We’re at a university — we came here to learn, not worry about the job market.

We shouldn’t forget that.
