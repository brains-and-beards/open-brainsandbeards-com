---
title: 'Advanced Redux Patterns: Normalisation'
date: '2019-02-01T10:46:01.947Z'
path: '/blog/advanced-redux-patterns-normalisation'
image: angry_tusk.jpeg
author: 'Wojciech Ogrodowczyk'
---

#### Normalisation

The term _normalisation_ comes from the database world. It refers to transforming the schema of a database to remove redundant information. Also, _redundant information_ means the same data that is stored in more than one place.

Why is it important? There are many possible reasons, the one that I consider the most important is about offering a _single point of truth_. It means that there’s exactly one place in the database that contains the true value of _something_.

#### Single source of truth

For example let’s say we have a site with a list of articles and every article has an author. A _normalised state_ would mean that each article would contain a _reference_ to its author and all the author’s data would be in a separate place, in some `author` store / DB table. In case of a _denormalised_ (not normalised) state / store / DB we could have all the author data bundled alongside the article. Sometimes it might make sense, especially for performance reasons (that could be a form of _caching_). However, what if we have two articles, both with the same author (we know it’s the same, because the ID is the same), but in our denormalised store we have different names (one says “Joe” and the other says “Bob”) listed under different articles. This could potentially happen, when there’s been an update to the author’s name that hasn’t been propagated well across our whole store.

That’s why the _single source of truth_ is important. If we had it, we’d know where to look to figure out which name is the correct one and update all the redundant (cached) copies.

#### Performance

Another reason to go for a normalised state in Redux is performance. If you have deeply nested structures, it’s difficult to traverse them. It’s much easier to find your data if you have it all filed by their ID in a dictionary / hash / map structure.

Imagine the performance of finding an article by its ID in a big array of articles (you’d have to go through the whole collection and check IDs along the way until you find it) compared to finding it in a dictionary structure where you can just fetch it directly by the ID.

![Normalisation is good, they said.](angry_tusk.jpeg)

#### Creating a normalised Redux store

Often, the structure of the stores in our applications reflects the format of the data that we receive from the API. However, it doesn’t have to be this way.

Usually, the format of the data that you receive in your app from your REST API reflects how _backend_ treats this data, which probably will be different how this data should be structured for you. For example, imagine a blogging platform where we use a mobile app to write new articles and browse what we already wrote.

#### Backend

The backend side needs to handle thousands of different users, so when one of them signs in using the mobile app and fetches their articles here’s what they do: they look for this particular user, find a collection of all of their articles and send it back to the app. Probably, as an array. Maybe something like that:

```javascript {numberLines: true}
{
  articles: [
    {
      id: 1,
      title: 'Dagon',
      tags: [
        { id: 1, name: 'old ones' },
        { id: 2, name: 'short story' },
      ],
    },
    {
      id: 2,
      title: 'Azathoth',
      tags: [
        { id: 1, name: 'old ones' },
        { id: 3, name: 'novel' },
      ],
    },
    {
      id: 3,
      title: 'At the Mountains of Madness',
      tags: [
        { id: 4, name: 'insanity' },
        { id: 3, name: 'novel' },
      ],
    },
  ]
}
```

#### Frontend

What would happen in a lot of apps, they’d just store those articles in the same form as they received it — as an array. This would make it easy to store (you can just save the JSON object that you received), but (a bit more) difficult to fetch the articles afterwards.

Instead of doing that, we should think about what would be the best schema **for us**. Probably, we’d do a lot of accessing by the article ID, so it would be nice to store them in a dictionary that allows us direct access. Also, we might notice that there’s some data redundancy with the tags. Backend returned to us a bunch of strings that get repeated a lot. We could do better by assigning them IDs, storing them in a separate table / dictionary and just reference them in articles. For example, our store could look like that:

```javascript {numberLines: true}
{
  articles: {
    1: { title: "Dagon", tags: [1, 2] },
    2: { title: "Azathoth", tags: [1, 3] },
    3: { title: "At the Mountains of Madness", tags: [3, 4] }
  },
  tags: {
    1: "old ones",
    2: "short story",
    3: "novel",
    4: "insanity"
  }
}
```

This store optimises what **our** needs are and how **we** want to access the data inside the mobile app that we’re running. But I can hear you saying:

> It’s such a _bore_ to do this data massaging manually… I don’t want to code it by hand!

![](1.gif)

#### Automating normalisation

Of course, we should automate and speed up this process (and avoid bugs that might pop up in our custom data massaging code). We could use [normalizr](https://github.com/paularmstrong/normalizr) for that. Here’s how that could look like.

#### Normalising data using a schema

First, we’ll need to define the schema that we want to use. In our case we have two objects (_entities_): `tag` and `article`. We’d have to describe the schema of the object that we originally receive. For the example above, our schema would be the following:

```javascript {numberLines: true}
import { normalize, schema } from 'normalizr'

const tag = new schema.Entity('tags', {})
const article = new schema.Entity('articles', {
  tags: [tag],
})

// We assume articlesData is the (parsed) JSON object that we got
const normalizedData = normalize(articlesData, { articles: [article] })
```

The above code defines what a `tag` (a `{}` object means that it doesn’t have any nested objects inside) and an `article` (something that contains an array of `tags`) look like. Then we try to normalize the data by passing the original object we got from the API and a schema that describes it (`{ articles: [article] }` tells us we’re dealing with an array of articles).

Here’s how the normalised state would look like:

```javascript {numberLines: true}
{
  entities: {
    tags: {
      "1": { id: 1, name: "old ones" },
      "2": { id: 2, name: "short story" },
      "3": { id: 3, name: "novel" },
      "4": { id: 4, name: "insanity" }
    },
    articles: {
      "1": { id: 1, title: "Dagon", tags: [1, 2] },
      "2": { id: 2, title: "Azathoth", tags: [1, 3] },
      "3": { id: 3, title: "At the Mountains of Madness", tags: [4, 3] }
    }
  },
  result: { articles: [1, 2, 3] }
}
```

At first glance, it looks a bit weird with the two main keys: `entities` and `result`, so let’s explain what those are:

- **Entities** are all the objects that are referenced in our data. We keep them sorted first by their type (`tags` and `articles`) and then by their IDs. This lets us to look them up easily. We can think of it as a dictionary of all the objects in our world.
- **Result** is the simplified version of what we passed into the normalising function. In our case we passed a list of articles with all of their nested objects, so we get back… a list of articles, just simplified to use the dictionary / entities references. That’s why it looks so simple: `{ “articles”: [1, 2, 3] }`. It’s up to us to use this `result` in a reasonable way in our app.

### Normalising state for Redux

So, the question arises — how do we use this normalised state to keep track of things **in our app**? We should probably separate two things:

#### Keeping track of what things are

One thing that we absolutely need to store in our Redux is the dictionary of all the objects in our world. That’s the `entities` part described above. Every article or tag that we want to reference in our app needs to be stored there and easily accessible by ID.

#### Keeping track of everything else

Of course, it’s an arbitrary case-by-case choice whether a particular piece of data should be stored as an _entity_, or as something else. In a lot of apps we store data that is only used to power the user experience. For example, we might need to store an ID of the article that has been edited last, or an error message that we received from a recent API call, etc.

Sometimes we can refactor it to use a local component state for such things (and it’d be better to do so), but not always. Sometimes we have a good reason to store it in the globally accessible state. In such case it might not make much sense to try to force it into a normalised form.

For example, that’s how our entire Redux state could look like for our article publishing app:

```javascript {numberLines: true}
{
  tags: {
    "1": { id: 1, name: "old ones" },
    "2": { id: 2, name: "short story" },
    "3": { id: 3, name: "novel" },
    "4": { id: 4, name: "insanity" }
  },
  articles: {
    "1": { id: 1, title: "Dagon", tags: [1, 2] },
    "2": { id: 2, title: "Azathoth", tags: [1, 3] },
    "3": { id: 3, title: "At the Mountains of Madness", tags: [4, 3] }
  },
  errorMessage: "Connection timed out.",
  lastArticleWorkedOn: 3
}
```

We can see here the _entities_ part where we describe all the `tags` and `articles` that we’re dealing with and apart from that we can see a couple of fields where we keep track of some values that help us with the application’s UI.

For example we have an `errorMessage` variable that we could use to provide a floating error message that follows a user around through different screens and only disappears after you acknowledge its existence. And a `lastArticleWorkedOn` field that helps the app to re-open the last article that the user was working on when we restart the app.

### Updating normalised state

At the first glance, this might seem like a huge hassle — do I really have to convert all this data that comes from the backend API calls? Fortunately, the `normalizr` schema that we set up earlier comes to the rescue.

Whenever we get new articles fetched from the API we could use our schema, convert them to our entities, and trigger a Redux action to update the entities:

```javascript {numberLines: true}
// We assume that we already receive some `apiResponse`
// and defined our schema as `articleSchema`
const normalizedArticles = normalize(apiResponse, { articles: [articleSchema] })

dispatch(addEntities(normalizedArticles.entities))
```

Then, in the Redux reducer, we could handle the state update as simple as that:

```javascript {numberLines: true}
export function reducer(state = {}, action) {
  switch (action.type) {
    case ADD_ENTITIES:
      return {
        ...state,
        ...action.payload.articles,
      }
    default:
      return state
  }
}
```

#### Conclusion

Using a normalised state in your Redux-powered mobile application doesn’t need to include a lot of manual (and error-prone) data massaging and can be automated. There’s no need to let the backend data format influence the way we store the application state on the frontend side and we can choose to go with formats and schemas that are better optimised for read performance and store size.

I hope you enjoyed this introduction to the topic of using a normalised state in a Redux application and you will give it a shot next time you’re deciding on your Redux store schema.

We’re working on presenting **more of advanced Redux usage patterns**, so watch this space to see them published soon. Of course, if you enjoyed reading this article, make sure you share it with your fellow developers!


If you like our posts, here are some more interesting articles to read:

[Building a cross-platform application with Flutter](https://brainsandbeards.com/blog/building-a-cross-platform-application-with-flutter)

[We’re all cross-platform developers](https://brainsandbeards.com/blog/were-all-cross-platform-developers)

[Reason & React Native: developing a sample feature](https://brainsandbeards.com/blog/reason-react-native-developing-a-sample-feature)