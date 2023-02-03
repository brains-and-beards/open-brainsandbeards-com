---
title: Flutter vs React Native Web
date: '2020-05-23T12:01:00.846Z'
path: '/blog/flutter-vs-react-native-web'
image: title.jpeg
author: 'Natalia Majkowska-Stewart'
imageCaption: '<a href="https://unsplash.com/photos/aP0g2W5OJ6o">Photo by Daniel Cheung</a>'
---

#### Introduction

After I finished my first app in Flutter Web I started writing my first app in React Native Web. The last couple of weeks we [published](https://brainsandbeards.com/blog/how-to-add-redux-persist-to-flutter-app) [articles](https://brainsandbeards.com/blog/how-to-add-local-notifications-to-flutter-app) based on the <a href="https://github.com/brains-and-beards/flutter-reminders-app" target="_blank">**Reminders App**</a>. To compare React Native Web with Flutter I decided to build the same app in RNW. During this process I noted some differences, either advantageous or disadvantageous for each solution. Let me share my thoughts with you in this article.

#### React Native Web

React Native integrates native development with React components, which allows developers to write code in JavaScript and render it in native UI elements. It supports Android, iOS, and Windows. React Native Web allows you to run React Native components and APIs in a browser using React DOM.

> High-quality web interfaces: makes it easy to create fast, adaptive web UIs in JavaScript. It provides native-quality interactions, support for multiple input modes (touch, mouse, keyboard), optimized vendor-prefixed styles, built-in support for RTL layout, built-in accessibility, and integrates with React Dev Tools.Write once, render anywhere: interoperates with existing React DOM components and is compatible with the majority of the React Native API. You can develop new components for native and web without rewriting existing code. React Native for Web can also render to HTML and critical CSS on the server using Node.js. [More information](https://github.com/necolas/react-native-web)

- React Native Web is compatible with React Native >= 0.60.

#### Flutter

Flutter is a UI toolkit created by Google. It is designed for building natively compiled applications for mobile, web, and desktop. Flutter has a single codebase for running apps on different platforms.

> Flutter's layered architecture gives you control over every pixel on the screen, and its powerful compositing capabilities let you overlay and animate graphics, video, text and controls without limitation. Flutter includes a full set of widgets that deliver pixel-perfect experiences on both iOS and Android. [More information](https://github.com/flutter/flutter)

#### App setup

It's quite easy to convert a mobile app to a web app with Flutter. I described the process [in the previous article](https://brainsandbeards.com/blog/building-a-cross-platform-application-with-flutter). As for React Native Web I followed the recommendations in the documentation.

> Expo is a framework and a platform for universal React applications. It is simple to setup, optimizes the web build, and provides dozens of additional cross-platform APIs.

I created an Expo app with the following commands:

```
npm install expo-cli --global
expo init amazingApp
cd amazingApp
expo start
```

#### Components vs Widgets

Having experience with React Native I've gotten used to declaratively creating components and specifying styles in a separate object. Flutter has similarities in the sense that you can declaratively build out widgets and pass them through as children to other widgets. Styling, however, is managed slightly differently. Many styles you declare in React Native Web are akin to those in CSS, but Flutter generally requires you to specify an appropriate widget and pass specific arguments to that widget. I'll try to explain the difference with a simple view.

![](item.png)

In the screenshot you can see:

- Card
- Icon
- Text
- Checkbox

Implementation in Flutter:

```javascript {numberLines: true}
    Card(
        margin: new EdgeInsets.only(left: 0, right: 0, top: margin),
        child: CheckboxListTile(
            value: checkBoxValue,
            onChanged: onChanged,
            title: Row(children: <Widget>[
              Row(
                children: <Widget>[
                  Icon(
                    remindersIcons[iconName],
                    color: Colors.blue,
                    size: 30.0,
                  ),
                  Padding(
                      padding: new EdgeInsets.only(left: margin),
                      child: Text(
                        iconName,
                        style: TextStyle(
                            fontSize: 14,
                            color: Colors.black,
                            decoration: TextDecoration.none,
                            fontWeight: FontWeight.normal),
                      ))
                ],
              )
            ])))
```

Flutter comes with an extensive list of Widgets to use out-of-the-box. Each one has a well-defined API and can take a number of properties to style the widget. In our example above, we've only used built-in Flutter widgets. Styling these widgets was just a matter of passing in the appropriate properties, which may have included nesting other widgets. The Flutter library gives you this without any external dependencies.

In React Native Web it wasn't so easy. Both technologies are still under development, so it wasn't surprising that I couldn't find a `CardView` library that works well with React Native Web and I had to define my own `CardView` component.

```javascript {numberLines: true}
import React, { Component } from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'

interface IProps {
  cardElevation: number;
  cornerRadius: number;
  shadowOpacity?: number;
  style?: StyleProp<ViewStyle>;
}

export default class CardView extends Component<IProps> {
  render() {
    const { cardElevation, cornerRadius, shadowOpacity = 0.24 } = this.props
    if (cardElevation > 0) {
      return (
        <View
          style={[
            {
              shadowOffset: {
                width: 0,
                height: cardElevation,
              },
              shadowRadius: cardElevation,
              shadowOpacity: shadowOpacity,
              borderRadius: cornerRadius,
            },
            this.props.style,
          ]}
        >
          {this.props.children}
        </View>
      )
    } else {
      return (
        <View
          style={[
            {
              borderRadius: cornerRadius,
            },
            this.props.style,
          ]}
        >
          {this.props.children}
        </View>
      )
    }
  }
}
```

Source: <a href="https://github.com/Kishanjvaghela/react-native-cardview/tree/master/libs" target="_blank">https://github.com/Kishanjvaghela/react-native-cardview/tree/master/libs</a>

```javascript {numberLines: true}
 <CardView
            style={{ width: Dimensions.get('window').width - 200, height: 50 }}
            cardElevation={2}
            cornerRadius={2}
          >
            <ReminderItem
              modalView={true}
              checkBoxValue={playMusic}
              onValueChange={onPlayMusicValueChange}
              reminder={
                new Reminder(
                  RemindersIcons.get(RemindersTypes.playMusic),
                  RemindersNames.get(RemindersTypes.playMusic)
                )
              }
            />

```

Then I declared `ReminderItem`:

```javascript {numberLines: true}
export const ReminderItem: FC<IProps> = (props) => {
  const { reminder } = props;

  const iconPath = reminder.icon;

  return (
    <View style={styles.reminderItem}>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Image style={styles.logo} source={iconPath as ImageSourcePropType} />
          <Text style={styles.reminderName}>{reminder.name}</Text>
        </View>
            <CheckBox
              style={styles.checkbox}
              value={props.checkBoxValue}
              onValueChange={props.onValueChange}
            />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkbox: { backgroundColor: 'blue', borderColor: 'blue' },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  reminderName: {
    fontSize: 16,
  },
  reminderItem: {
    margin: 10,
  },
});

```

In my opinion when comparing the two solutions React Native Web is neither as concise, nor as elegant, due to the boilerplate and number of lines of code required. I also think that declaring styles in Flutter is much easier. We can create composable components in React Native, such as a Row component. But, we need to remember that Flutter offers these widgets out of the box. I also like the fact that whatever widgets I use in Flutter for mobile would also work on the web - even a `TimePicker`. In React Native Web I had problems with many libraries that are not compatible with the web environment. In the end it felt easier to put this component together in Flutter.

#### Community

The React Native community has been around since 2015 when the technology was first released. The alpha version of Flutter was released in 2017, and the first stable version was released on December 4th, 2018. It's quite obvious that the React Native ecosystem is larger than Flutter. There is a lot of tutorials out there for React Native and most of them still apply to React Native Web. JavaScript is also a more popular programming language than Dart.

#### Documentation

Good documentation has been hard to come by for React Native. It's getting better as the community grows but it's still lacking comprehensive examples. As for React Native Web, the documentation is okay, but also lacks details. On the other hand, Flutter documentation is excellent. It explains everything really well, offering many examples, videos, and interactive previews. You can see some documentation examples here:

<a href="https://necolas.github.io/react-native-web/docs/?path=/docs/components-button--color" target="_blank">Link for React Native Web Button</a>

<a href="https://api.flutter.dev/flutter/material/RaisedButton-class.html" target="_blank">Link for Flutter Raised Button</a>

#### UI Tests

At Brains & Beards, we love writing tests. They provide us with a lot of advantages, like allowing us to refactor code without introducing breaking changes or regressions. Fast executing tests give us instant feedback on our work. And quick feedback loops means faster iterations and avoiding time-consuming debugging sessions.

In my opinion, one of the weakest sides to React Native is UI testing. React Native doesn't offer official support for UI level testing, so we must use third-party tools instead.

In React Native we can write two types of UI tests:

- Integration tests - let a developer test multiple screens or specific use cases. There aren't many good libraries for integration testing on React Native, although Detox is the most comprehensive solution.
- Snapshots tests - let a developer test specific components. Each time a test is run, the rendered result is compared with a previous snapshot. The difficulty of writing snapshot tests depends on the complexity of your component and how well isolated it is.

> **Detox** (<a href="https://github.com/wix/Detox" target="_blank">Gray box end-to-end testing and automation library for mobile apps.</a>). You can check out our article about it ([Handling runtime application permissions in Detox](https://brainsandbeards.com/blog/handling-runtime-application-permissions-in-detox)).

Writing Detox tests takes time, and running them is quite slow if you have a big application. As well, many times, things break, and you will spend a lot of time debugging your testing setup. Detox is the best solution to the UI testing problem, but hardly an ideal one.

In the Flutter documentation we can find information about three types of tests: widget tests, integration tests, and unit tests.

Flutter gives us the opportunity of testing as part of the framework. This lets us write tests without any third-party libraries. Surprisingly, tests run very fast and writing them isn't difficult. For UI tests we can use widget and integrations test:

- Widget tests - let a developer test a single widget, check that the widget interacts as expected, and responds to user actions.
- Integration tests - let a developer test a bigger part of the app. For example, navigation, performance, or an entire set of functionality. Similarly to Detox, the tests can be run on an OS emulator.

<a href="https://flutter.dev/docs/testing" target="_blank">Flutter tests documentation</a>

Unlike Detox, one of the benefits of Flutter integration testing is that tests are cross-platform compatible, meaning they can run on mobile and the web.

#### Summary

You probably know there are no clear winners in the programming world. Everything has some strings attached, and many things are subjective. But if you are looking for our personal conclusion, we would give an edge to Flutter in UI testing, documentation and the amount of out of the box widgets. React Native would win in community support. 

Naturally, as I have more experience with React Native, it was easier and faster to write the web version of the Reminders App in React Native Web rather than in Flutter. However, as I showed you in this article, one of the components needed substantially more boilerplate code than the widget I did in Flutter. 

I think Flutter has a bright future. It is a fast, cross-platform solution with good, growing community support. On the other hand, React Native uses Javascript, one of the most widely-used languages around the world. So, for many developers it will be easier to write the app in React Native than in Flutter. I don't have a strong opinion about which solution is better. 

I can't predict the future, but I can say React Native isn't going anywhere and the Flutter community will continue to grow.

#### Similar articles

If you like our Flutter tutorials, here are some more interesting articles to read:

[How to add Camera support to a Flutter app?](https://brainsandbeards.com/blog/how-to-add-camera-support-to-a-flutter-app)

[Bottom Navigation with a List Screen in Flutter](https://brainsandbeards.com/blog/bottom-navigation-with-a-list-screen-in-flutter)

[How to add a dark mode splash screen to a React Native app?](https://brainsandbeards.com/blog/how-to-add-a-dark-mode-splash-screen-to-a-react-native-app)

#### References

<a href="https://github.com/Kishanjvaghela/react-native-cardview/tree/master/libs" target="_blank">https://github.com/Kishanjvaghela/react-native-cardview/tree/master/libs</a>

<a href="https://github.com/necolas/react-native-web" target="_blank">https://github.com/necolas/react-native-web</a>

<a href="https://github.com/flutter/flutter" target="_blank">https://github.com/flutter/flutter</a>
