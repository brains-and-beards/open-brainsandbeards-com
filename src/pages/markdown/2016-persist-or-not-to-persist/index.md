---
title: To persist or not to persist
date: '2016-12-21T09:27:47.538Z'
path: '/blog/to-persist-or-not-to-persist'
image: ouroboros.jpeg
author: 'Marek Waligórski'
---

Anyone who has used an app which requires registration knows how frustrating it is for the user to enter their login credentials more than once. While it might sometimes be necessary for security purposes, we should strive to keep this nuisance to a safe minimum. Preferably, we would like the user to log into our app just once, and then quickly forget about this utter waste of time by allowing them to freely enjoy the app’s cool features. But what if the user closes the application, or simply reboots their phone? We definitely don’t want them to go through the horrors of login again!

This is where a persistent navigation state comes in handy. In this article, we will show a simple way to store a React Native app’s navigation state and bring back the user to the last page they visited, as well as present potential problems with such a setup.

#### Basic setup

Imagine we have a React Native application composed of several screens (let’s call the initial one a _LoginScreen_)_._ How can we save the information about which screen was visited last? A natural solution for many React users would be to store the navigation stack in a state container such as Redux.

I will not go into much detail on this one, because of [multiple](https://medium.com/react-native-training/react-native-navigator-experimental-part-3-adding-tabs-28a2c57356b6#.ctplwuelt) [online](http://blog.thebakery.io/react-native-experimental-navigation-with-redux/) [tutorials](https://medium.com/@satya164/react-natives-navigationexperimental-with-redux-467acee02756#.72wtji1r5) which have been dedicated to coupling Redux with either Navigator or NavigationExperimental modules from React Native.

If you follow any of these tutorials, you’ll probably wind up with a “navigation reducer”, whose initial state will be similar to this one:

```javascript {numberLines: true}
export const INITIAL_STATE = {
  index: 0,
  key: 'root',
  routes: [{ key: 'LoginScreen' }],
}
```

When transitioning to other parts of the app, the new screen routes will either be pushed on top of the stack, or replace the current route.

#### Persisting navigation state

With a neat tool such as [redux-persist](https://github.com/rt2zz/redux-persist/), you can have the whole app state (or just selected reducers if you prefer) automatically saved into the AsyncStorage of the device on each update, by adding but a few lines of code.

```javascript {numberLines: true}
import { persistStore, autoRehydrate } from 'redux-persist'
const store = createStore(reducer, undefined, autoRehydrate())
persistStore(store)
```

By using `persistStore(store)`, we make sure that the Redux representation of the navigation state of our app will be saved after each transition. The `autoRehydrate()` enhancer forces the app to “rehydrate” (a.k.a. reload) the persisted app state on startup. Combining these two results in showing the user the very same screen where they left the app, even if it was closed in the meantime.

#### When not to persist?

Persisting the application state provides a great user experience… but only as long as everything is working correctly. However, remember that in release mode the app is killed as soon as an error is encountered. This, in turn, means that once the app crashes on some screen, it will be “rehydrated” on the next launch with an erroneous state, and the error will occur again. This way, the user will be trapped in a crash loop forever, unless they make a complete reinstall of our application!

![How you feel when the app starts crashing on launch.](ouroboros.jpeg)

This is one of the rare cases when it makes more sense to clean up everything and bring the user back to the login screen. Fortunately, React Native provides an easy way to [trap errors globally](http://stackoverflow.com/questions/30918349/how-to-catch-uncaught-exception-globally-in-react-native). We just need to take the `setGlobalHandler` function from the `ErrorUtils` object and call it in your app’s main component.

A very simple error handler can look like this:

```javascript {numberLines: true}
export default class Root extends React.Component {
  componentWillMount() {
    //Intercept react-native error handling
    this.defaultHandler = ErrorUtils.getGlobalHandler()
    ErrorUtils.setGlobalHandler(this.wrapGlobalHandler.bind(this))
  }

  async wrapGlobalHandler(error, isFatal) {
    // If the error kills our app in Release mode, make sure we don't rehydrate
    // with an invalid Redux state and cleanly go back to login page instead
    if (isFatal && !__DEV__) AsyncStorage.clear()

    //Once finished, make sure react-native also gets the error
    if (this.defaultHandler) this.defaultHandler(error, isFatal)
  }

  // (...)
}
```

And voilà! If the app crashes in production mode, the whole app state will now be reset to the initial values on the next launch, bringing the user back to a (hopefully) safe place, such as the login screen.

Some things to keep in mind while designing your own error handler:

1.  Another error handling function might already have been installed in our app (this might be the case if we use a JS-friendly bug tracker, such as [Bugsnag](https://bugsnag.com/)). The simplest way to make sure the errors are handled correctly is to call the original handler from within a wrapper function (see `wrapGlobalHandler` in the example above).
2.  We’re only going to clean the app state in release mode — in development it usually makes more sense for the programmers to stay on the crashing page and be able to easily reload it over and over again until the problem is fixed.
3.  In this example, we just clear the whole AsyncStorage for our application. This may or may not be the desired behaviour. Under certain conditions, you might prefer to remove only selected keys (for example, the ones responsible for navigation).
