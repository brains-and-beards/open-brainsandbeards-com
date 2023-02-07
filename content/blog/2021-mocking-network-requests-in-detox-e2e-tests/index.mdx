---
path: '/blog/mocking-network-requests-in-detox-e2e-tests'
date: '2021-01-18T08:12:41.253Z'
title: 'Mocking network requests in detox E2E tests'
image: header.jpg
author: Wojciech Ogrodowczyk
---

This post will talk about how to mock network requests in the [detox](https://github.com/wix/detox)-powered end-to-end tests of your mobile application. 

## Why would you do a crazy thing like that?

Let's address the elephant in the room. For a lot of people, end-to-end tests mean nothing should be mocked. With this line of thought, mocking network requests would be a crazy thing to do, invalidating the whole purpose of the end-to-end test. To which I'd say the following:

* What is "end", anyway?
* We (meaning: everybody) mock things in E2E tests all the time
* Sometimes E2E tests are not only used for testing
* Some things are hard (or slow) without mocking

If that's enough for you, just skip over to the "how to" section. Otherwise, read on for details below.

### What is "end", anyway?

The end-to-end tests are meant to test the whole scope of… your app? your service? user experience? Well, that really depends on you.

What the "end" of the scope means depends on your perspective. Let's take a look at an imaginary ecommerce app. For a developer from a checkout team E2E test would probably mean: user picks some items, proceeds to checkout, fills in all their details, pays, order is created. But for an actual user, the "end-to-end" means: they were able to find a product that they were looking for (even though they misspelled the name of the brand), they could clearly see the differences between various models, they could order abroad, download an invoice with correct VAT tax amount and finally, they got the item in the mail. As you can see, "end-to-end" is a very relative term.

For example, if you can control only the mobile app part of the code, maybe it doesn't make much sense to depend on the backend part in your end-to-end tests? 🤔

### We (meaning: everybody) mock things in E2E tests all the time

Any automated E2E test is full of mocks. We mock the user out with a script that's tapping buttons in an app. We mock the backend production server with a (hopefully identical) staging server. We mock an actual device with an emulator. My point is, we've already decided to mock some things out, because it makes our live easier, so the question is not: "should we mock or not?" but "what should we mock to make our tests better?".

### Sometimes E2E tests are not only used for testing

Your detox test suite might be used for different purposes then to validate the correctness of the app. One great example would be taking screenshots of your app. Whether for half-manual design QA, or for submitting them to the app store. If your app is available in four languages on two platforms, it's much easier to generate a suite of screenshots automatically then click through the app 24 times (two platforms times four languages times three device sizes per platform).

### Some things are hard without mocking

Sometimes it's easy to write your E2E tests without mocking the network traffic, but we don't all get this luxury. For example, you might work on a ride-hailing app and you want to test that when the vehicle gets close to the passenger, the status automatically changes. Driving real cars around just for the sake of purity of your end-to-end tests would not only be expensive, but also tedious and slow. I bet most of us would rather mock the vehicle and its location out, right?

Okay, I hope we're on the same page now. Let's stop talking about why and focus on how.

## How can you do it?

Probably, there's a lot of ways. The one I like is to use a piece of software that we (here at [Brains & Beards](https://brainsandbeards.com)) have recently open-sourced: [mimic-server](https://github.com/brains-and-beards/mimic-server). It's a server that will run in the background and serve pre-defined responses to your network requests. It's a little rough around the edges, but I'm sure you'll figure your way around as the rockstar that you are. Here are some tips:

### Setup

First, you'll probably want to add it as a development dependency in your project, for example with: `yarn add "brains-and-beards/mimic-server#v0.10.0"` (make sure you install the v0.10.0 tag from GitHub,there's no package yet on npm).

Then you'll have to prepare a basic configuration file for the mocking server. A good starting point would be the [example configuration in the project](https://github.com/brains-and-beards/mimic-server/blob/master/apimocker.json). You'll need to create different config files for different "stages" of your app. The whole point is we want to be able to dynamically change mocks while the detox tests are running (otherwise we could have just hard-coded the responses using the [detox mocking mechanism](https://github.com/wix/Detox/blob/master/docs/Guide.Mocking.md)).

Then you'll need a bit of glue code that would allow you to juggle the configs (possibly synchronously!) while the tests are running:

```javascript
import { ensureDir } from 'fs-extra'
import MimicServer from 'mimic-server'

import { sampleMockOne, sampleMockTwo } from './someNetworkMocks'

const mimicServerConfigFile = `${__dirname}/base-mock-config.json`

export default class MockServer {
  serverProcess: any

  constructor() {
    ensureDir('/tmp/apimocker_server', () => {
      const errorHandler = (code?: number) => {
        throw `server process exited with code ${code}`
      }

      try {
        this.serverProcess = new MimicServer(mimicServerConfigFile, errorHandler)
        this.serverProcess.run()
      } catch (err) {
        errorHandler()
      }
    })
  }

  start = async () => {
    return this.serverProcess.run(false)
  }

  stop = async () => {
    return this.serverProcess.stopServer()
  }

  switchMock = async (mockSet: number) => {
    const mockConfig = mockSet === 1 ? sampleMockOne : sampleMockTwo
    await this.serverProcess.switchConfig(mockConfig)

    return
  }
}
```

This code loads three different sets of mocks: a base config file and two mocks to represent different stages of the application. We use the `switchMock` command to switch between those states.

Of course, being a rockstar programmer that you are, you can figure out yourself how not to store the whole static config files, but rather generate them dynamically when needed. To make it easier `serverProcess.switchConfig` method takes directly a JSON object, not a filepath.

### Profit

The above setup lets you juggle different network responses from within you detox test scenario. Just make sure to use detox mocking to point at the server that mimic-server spins up and you're golden. 
