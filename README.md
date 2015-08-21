# Fruxxi

### (Fr)anks Fl(ux) (I)mplementation

## Dispatcher
The dispatcher acts as an event forwarder.
It takes every event called by the dispatch method and
calls all registered callbacks with that data submitted via the dispatch.

One can register callback functions to the dispatcher.
All callback functions, even from different sources,
are called on each dispatch call.

The registered callbacks are called with the two arguments provided via
the dispatch method call. The first one is unique `name` of the
dispatch and the second is the data associated to that name of dispatch.

## StoreCreator

The store creator is just a function returning a class.

The `storeMessages` parameter is a map of all the messages
the store should respond to.

`initialStoreData` is used to fill the store with a initial
dataset and is optional.

To create a new store pass storeMessages and optionally initialStoreData
to the creator function. This call will return a class. The class must be
called with the dispatcher as argument.

EXAMPLE:

file: `store.js`
```js
import storeCreator from './storeCreator.js';

const initialStoreData = {
 status: 'OK',
 view: 'fair-at-link'
};

const storeMessages = new Map([
 ['messageType', (data, oldData) => updateStore(data, oldData)]
 ]);

export default storeCreator(storeMessages, initialStoreData);
```

file: `main.js`
```js
import Dispatcher from './dispatcher.js';

import Store from './store.js';

let dispatcher = new Dispatcher();
let store =  new Store(dispatcher);
```

## Component

The component class implements a kind of frontend component.
This must not be a dom element but can also be a kind of logical component
that holds states and triggers actions.

The constructor must be provided
with a stores object. The actions are not mandatory.
Some components might not need to trigger actions.

Each value in the stores object should be an event emitting class.
The constructor iterates over the Object and adds a onChange
method to that store.
