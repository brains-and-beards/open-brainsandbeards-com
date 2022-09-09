---
path: '/blog/how-to-stay-sane-and-remove-strings-from-nsnotificationcenter'
date: '2016-08-15T12:18:24.097Z'
title: How to stay sane and remove strings from NSNotificationCenter
image: sparta.jpeg
author: 'Patryk Peszko'
---

It’s 2016; we have Swift, and strong typing is perceived as cool stuff, but yet there are some dark places in our code base where you have to use string-programming. Below I will show you how to get rid of those pesky strings in Notification. The idea is to have an easy to understand solution without any magic. Ready? Grab a cup of you favourite beverage and enjoy your break :)

> String-Programming: A highly scientific term which describes using strings as data vessel instead of structs, enums, classes, etc. The latter blows during compiling, the former possible in your users’ hands. It’s a situation where we tell the compiler that we can do his job better than he is doing — this is Sparta!

> For people in a hurry who can’t stay longer here: You can download the final code as Playground here: [https://github.com/ppeszko/NotificationWrapperExample](https://github.com/ppeszko/NotificationWrapperExample)

#### The Way

Let us, before improving anything, have a quick look to status quo.

Below you have a typical NSNotification implementation following Apple rule books aka documentation :)

```javascript {numberLines: true}
import UIKit

struct Payment { }

enum PaymentResponse {
    case Accepted(Payment)
    case Rejected(Payment)
}

// It's just an example for notifications. The rest can be safely ignored :)
class SadPaymentViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        let notificationCenter = NSNotificationCenter.defaultCenter()

        // MARK: ლ( `Д’ ლ)
        // This tells Notfication Center that we are interested in updates.
        notificationCenter.addObserver(self,
            selector: #selector(SadPaymentViewController.paymentNotificationReceived(_:)),
            name: "PaymentViewControllerNotificationRejected",
            object: nil)
        notificationCenter.addObserver(self,
            selector: #selector(SadPaymentViewController.paymentNotificationReceived(_:)),
            name: "PaymentViewControllerNotificationAccepted",
            object: nil)
    }

    func paymentServiceDidReturn(paymentResponse: PaymentResponse) {
        let notificationCenter = NSNotificationCenter.defaultCenter()

        switch paymentResponse {
        case .Accepted(_):
            // MARK: •́︵•̀
            // And this is how we post notifications
            notificationCenter.postNotificationName("PaymentViewControllerNotificationRejected",
                object: nil,
                userInfo: nil)
        case .Rejected(_):
            notificationCenter.postNotificationName("PaymentViewControllerNotificationAccepted",
                object: nil,
                userInfo: nil)
        }
    }

    func paymentNotificationReceived(notification: NSNotification) {
        //FIXIT: Write this code before release, okay? Bye, I'm off for vacation. ᕕ( ᐛ )ᕗ
    }

    deinit {
        NSNotificationCenter.defaultCenter().removeObserver(self)
    }

}
```

So, just to recap it, Notifications are objects which have a name as routing key, they can be scoped by a sender object and may contain some data in a form of an array.

Let me first point out our biggest pains with NSNotification. So we can see if the solution below delivers what it promises.

#### Repetitive code

To listen to a notification, we need to know its name. The same for posting a notification. This is a lot of clunky and repetitive code. As nobody likes writing the same thing over and over again, we would probably use copy&paste skills shorten our sufferings. This is what I used to create this example at least. And if you read it mindfully you would see that I made a mistake and switched “Rejected” with “Accepted” name while posting a notification. This kind of errors may slip through testing and code review. Long, spaghetti-like strings are not exactly reviewer’s eye friendly, are they?

#### Unique notification names

Notification Center needs keys to distribute notification between observers. These keys are made of strings, and they have to be unique for each notification. Otherwise, as you may expect, bad things would happen. An object may receive a notification not addressed for it or never get an expected one. That would be a real mess to test and find the bug. Usually, to minimalise the chance of name clash, we will use sender name as part of the notification name. A poor man’s namespaces implementation. This is a very tedious process, which produces a lot of meaningless keystrokes, which then leads to more copy&pasting.

#### Refactoring problem

Based on the point above, the notification’s name contains now a class name. If you want to rename the class, you will now have to rename the notification as well (and all its observers and emitters). There is another mistake in the example, this time not on purpose: I’ve renamed PaymentViewController to SadPaymentViewController but forgot to do the same to notification name. My [CDO](http://media-cache-ec0.pinimg.com/736x/5e/03/bb/5e03bb75fc695147374bef9fcad4dfe3.jpg) can’t handle this!

#### Compiler: “Bye, you’re on your own, buddy.”

With this implementation, we’ve managed to obscure our code to the point where compiler just only can wish as good luck and signs off.

<div class="gif-container">

![](1.gif)

</div>
We made this code by following the rules from the documentation, but we can do much better than that 💪.

#### The How

I wanted to come up with the easiest solution possible, without complex generics and other “shenanigans”. It’s good to know your toolset, but that doesn’t mean that everything is a nail :)

At the end our Sad controller evolve to nicer Happy controller:

```javascript {numberLines: true}
// It's just an example for notifications. The rest can be safely ignored :)
class HappyPaymentViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        PaymentNotifications.accepted.observe(self,
            selector: #selector(HappyPaymentViewController.paymentNotificationReceived(_:)))
        PaymentNotifications.rejected.observe(self,
            selector: #selector(HappyPaymentViewController.paymentNotificationReceived(_:)))
    }

    func paymentServiceDidReturn(paymentResponse: PaymentResponse) {
        switch paymentResponse {
        case .Accepted(_):
            PaymentNotifications.accepted.post()
        case .Rejected(_):
            PaymentNotifications.rejected.post()
        }
    }

    func paymentNotificationReceived(notification: NSNotification) {
        //FIXIT: Write this code before release, okay? Bye, I'm off for vacation. ᕕ( ᐛ )ᕗ
    }

    deinit {
        NSNotificationCenter.defaultCenter().removeObserver(self)
    }

}
```

Much cleaner, isn’t it? This HappyViewController looks like pal we could hang out with!

In the code above we have some sort of object thingy called **PaymentNotifications** which includes **accepted** and **rejected** values. It looks like theses values can emit themselves and that we can subscribe to them as well.

Cool, but what is this PaymentNotification?

```javascript {numberLines: true}
enum PaymentNotifications: String, Notifiable {
    case accepted
    case rejected
}
```

As you can see the implementation is very tiny. It’s an enum which has to conform to **Notifiable** protocol. This protocol is very simple, and we can provide a default implementation for it without any problems. This is fantastic news as now, if you like the pattern, you can easily refactor your code to it. The only thing you need to do is:

1.  Create enum
2.  Specify notification names as enum cases
3.  Conform to Notifiable and subclass from String.
4.  Done :)

Let’s reveal now the protocol and its extension.

```javascript {numberLines: true}
// In the past I was calling it Notification but iOS10
// NSNotification was renamed to Notification, so ¯\_(ツ)_/¯
protocol Notifiable: RawRepresentable {

    func post(userInfo aUserInfo: [NSObject : AnyObject]?, object anObject: AnyObject?)
    func observe(observer: AnyObject, selector aSelector: Selector, object anObject: AnyObject?)

    func name() -> String

    func notificationCenter() -> NSNotificationCenter

}

extension Notifiable {

    func post(userInfo aUserInfo: [NSObject : AnyObject]? = nil, object anObject: AnyObject? = nil) {
        notificationCenter().postNotificationName(self.name(),
            object: anObject,
            userInfo: aUserInfo)
    }

    func observe(observer: AnyObject, selector aSelector: Selector, object anObject: AnyObject? = nil) {
        notificationCenter().addObserver(observer,
            selector: aSelector,
            name: name(),
            object: anObject)
    }

    func name() -> String {
        return "\(self.dynamicType).\(self.rawValue)"
    }

    func notificationCenter() -> NSNotificationCenter {
        return NSNotificationCenter.defaultCenter()
    }

    var description: String {
        return name()
    }

}
```

It’s that simple :) Let’s just check if this solution is any better than the original one:

1.  No strings visible outside the extension ✅
2.  Strings are unique, and the uniqueness is guaranteed by compiler ✅
3.  You can use refactoring tools to change notification name, and you won’t miss any occurrence ✅
4.  Boilerplate copy&pasted code is gone ✅
5.  Xcode autocompletion sweetness works as well ✅

<div class="gif-container">

![](2.gif)

</div>
Here is a link to a Playground with all code included: [https://github.com/ppeszko/NotificationWrapperExample](https://github.com/ppeszko/NotificationWrapperExample)

Thank you for reading this ♥️. If you think that somebody would benefit from this article, please consider recommending it. This helps me a lot :) Have a look as well to my previous blog post:

[https://brainsandbeards.com/blog/remote-workers-data-in-danger-protect-yourself](/blog/remote-workers-data-in-danger-protect-yourself)
