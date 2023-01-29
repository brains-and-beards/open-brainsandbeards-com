---
path: '/blog/failing-gracefully'
date: '2021-08-23T14:13:14.069Z'
title: 'The Art of Failing Gracefully'
image: header.jpeg
author: Łukasz Wolski
imageCaption: 'Moon moon in the mud'
---

Lets face it - sometimes TypeScript is just not enough. I mean, you might have made everything by the book, no shortcuts with any types, no convenience rule disabling comments, no nada, yet still every now and then the app breaks because of an error - of course you *Cannot read property of undefined*, dummy. 

So you start debugging to find the culprit and it is always the same story, there’s something missing in the response, something you weren’t prepared for. Maybe it is a migration issue, maybe it is a third party service that doesn’t guarantee a certain contract, or maybe you just assume too much. Anyways, had it not been for the backend, nothing would have crashed.

You could probably fix it in 5 minutes with an util from your favorite library like **lodash** or **ramda** and sprinkle **get/prop** all over the place. 
Better yet, take advantage of [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) and achieve exact same thing dependency free. It will probably get the job done, but what about the next time? Will this be enough to confidently claim nothing like that will ever happen again?

Honestly, having a static type system is great, but it will not save you from runtime errors when the API suddenly starts spewing out random stuff. There’s an easy way to prevent it, but first you have to take a step back. What you need to do is: instead of writing elaborate if-else clauses or going about checking if a property of a nested object exists during the execution time, be like a chef and prep the data before using it.

You could either provide a decoder for a given endpoint that will validate the shape of the success response, or in case of a state management architecture - store the raw data and have a dedicated getter in form of a selector. Both operate on the same principle, the data flows through a parser that will format the fields according to the contract expected down the road. This will give you a guarantee that the relied type signature is sound and safe to process.

Now, it’s up to you how to handle any sort of discrepancies. Probably it would be a good idea to send logs for missing data so it doesn’t go unnoticed, as for missing fields - it’s a perfect moment to provide default values, or to remove parts of data.


## Code Please

- Generic parser that logs errors and takes contract specific mapper

```ts {numberLines: true}
const safeParser = <InputType, ResultType>(
 mapper: (item: InputType) => ResultType,
 item: InputType,
) => {
 try {
   return mapper(item);
 } catch (error) {
   logError({
     error,
     inputData: JSON.stringify(item),
   });
   return undefined;
 }
};
```

- Assuming following type definition:

```ts {numberLines: true}
type Apple = {
 cultivar: string;
 trivia: {
   pollination: {
     group: string;
   };
 };
};
```

- And a matching mapper that will model the structure according to the needs 

```ts {numberLines: true}
const appleMapper = (apple: Apple) => {
 if (!apple.cultivar) {
   throw new Error('Bad Apple!');
 }
 
 return {
   cultivar: apple.cultivar,
   trivia: {
     pollination: {
       group: apple.trivia?.pollination?.group || 'A',
     },
   },
 };
};
```

- Given the following API response:

```ts {numberLines: true}
const response = {
 content: [
   {
     cultivar: 'Red Astrachan',
     trivia: {
       pollination: {
         group: 'A',
       },
     },
   },
   {
     cultivar: 'Arkansas Black',
   },
   { what: 'am I doing here' },
 ],
};
```

- You are ready to tackle anything thrown at you

```ts {numberLines: true}
const validateApples = ({ content = [] }: { content: Apple[] }) =>
  content
    .map((apple) => safeParser(appleMapper, apple))
    // remove empty elements in case of a thrown error
    .filter((e) => e !== undefined);

const apples = await fetchApples();

const themApples = validateApples(apples)
```


<div class="gif-container">

![](how-you-like-them-apples.gif)

</div>
