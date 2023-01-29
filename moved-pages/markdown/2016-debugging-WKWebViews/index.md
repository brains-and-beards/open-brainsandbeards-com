---
title: Debugging WKWebViews
date: '2016-02-19T12:09:27.362Z'
path: '/blog/debugging-wkwebviews'
image: success.jpeg
author: 'Brains&Beards'
---

With the recent launch of iOS9 it’s time to switch webviews. It’s customary to support the two last versions of Apple’s mobile OS, so it means that finally iOS7 is going away. Rejoice!

Whether you’re migrating from UIWebView or just starting out with the new stuff, there’s a bunch of undocumented „features” that you should know to keep sane.

#### Limits

WKWebViews have limits on what the JavaScript you inject is allowed to do. You can’t use _alert()_ or _confirm()_, for example. Anything that obstructs the user’s experience (so typical debugging tools) are off-limits. What you should do instead is use [WKScriptMessageHandler protocol](https://developer.apple.com/library/prerelease/ios/documentation/WebKit/Reference/WKScriptMessageHandler_Ref/index.html) to send messages back to your app and them NSLog them there. This way you’ll have some basic printf-debugging capabilities.

Also, keep in mind that there’s a limit to the length of the message that you’re allowed to send back, so you can’t just do _document.body.outerHTML_. Focus on the parts that you need to work on.

#### POST requests

Loading a frame with a POST request is not allowed. Documentation suggests that you can load any _NSURLRequest_, but in practise they’re all translated to a GET in the end. However, there’s a trick that you can do. You could load a local HTML string that contains an empty page and a JS _post()_ function that takes a url and payload. Then, using JS frame scripting you can use the _post()_ method in your empty page to send the request you wanted in the first place. This way you’ll get to see the result of the POST request in the frame.

Here’s how example code could look like:

```javascript {numberLines: true}
func makePostRequest(url: String, payload: Dictionary) {
    let jsonPayload: String
        do {
            let data = try NSJSONSerialization.dataWithJSONObject(
                payload,
                options: NSJSONWritingOptions.PrettyPrinted)
                jsonPayload = String(data: data, encoding: NSUTF8StringEncoding)!
        } catch {
            jsonPayload = "{}"
        }

    webView.loadHTMLString(postMakingHTML(url, payload: jsonPayload), baseURL: nil)
}

private func postMakingHTML(url: String, payload: String) -> String {
    return "<html><head><script>function post(path,params,method){method = method || 'post';var form=document.createElement('form');form.setAttribute('method', method);form.setAttribute('action',path);for(var key in params){if(params.hasOwnProperty(key)){var hiddenField=document.createElement('input');hiddenField.setAttribute('type', 'hidden');hiddenField.setAttribute('name', key);hiddenField.setAttribute('value', params[key]);form.appendChild(hiddenField);}}document.body.appendChild(form);form.submit();}</script></head><body></body></html><script>post('\(url)',\(payload),'post');</script>"
}
```

#### Injecting JavaScript

![](success.jpeg)

Final note, when [injecting your JavaScript](https://developer.apple.com/library/prerelease/ios/documentation/WebKit/Reference/WKUserScript_Ref/index.html) be sure you’re working in small increments. Write the smallest amount of code that does \*anything\*, verify it works, write the smallest change possible, verify, etc. This is because of the fact that when you make a small syntax error (missing semicolon — those are the worst for a develper who already got used to Swift!) everything just stops working, with no error message. It helps **a lot** when you know what was the exact change you did that broke it.

As you can see, working with web views is not all roses and butterflies, but sometimes there’s no other way. Hope this small list of undocumented WKWebView behaviour helps you when your time comes to jump into this swamp.
