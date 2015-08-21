import test from 'tape';
import storeCreator from '../src/storeCreator.js';
import Dispatcher from '../src/dispatcher.js';

/**
 * The dispatcher we use. Must provide `dispatcher.register(callback)` and
 * call the callback with `callback(message:{string}, data:{*})`.
 */
const dispatcher = new Dispatcher();

/**
 * The data values we use to test our store creator.
 * @type {Object}
 */
const initialData = {1: 2},
  newData = {3: 4},
  actionType = 'actionType';

/**
 * Sets up a simple store.
 * @return {Object} The store to test.
 */
const setupStoreDummy = () => {
  const storeMessages = new Map([
    [actionType, data => data]
  ]);

  let Store = storeCreator(storeMessages);

  return new Store(dispatcher);
};

/**
 * Sets up a store with initial values.
 * @return {Object} The store to test.
 */
const setupStoreWithInitialValues = () => {
  const storeMessages = new Map([
    [actionType, data => data]
  ]);

  let Store = storeCreator(storeMessages, initialData);

  return new Store(dispatcher);
};

/**
 * Sets up a store that handles the old store data too.
 * @return {Object} The store to test.
 */
const setupStoreUsingOldAndNew = () => {
  const storeMessages = new Map([
    [actionType, (data, current) => {
      return {newData: data, oldData: current};
    }]
  ]);

  let Store = storeCreator(storeMessages);

  return new Store(dispatcher);
};

test('`getData()` should return stored data object', t => {
  t.plan(1);

  let store = setupStoreDummy();

  let data = store.getData();
  t.deepEqual(data, {}, 'check for initialData');
});

test('Store data should change on receiving a specified action type', t => {
  t.plan(2);
  let store = setupStoreDummy(),
    data = {};

  data = store.getData();
  t.deepEqual(data, {}, 'check for initialData');

  dispatcher.dispatch(actionType, newData);

  data = store.getData();
  t.deepEqual(data, newData, 'check for newData');
});

test('The should not change data on a not defined action typ', t => {
  t.plan(2);
  let store = setupStoreDummy(),
    data = {};

  data = store.getData();
  t.deepEqual(data, {}, 'check for initialData');

  dispatcher.dispatch('notDefinedDispatcherMessage', {
    '1': 2
  });

  data = store.getData();
  t.deepEqual(data, {}, 'check not updated data');
});

test('The store should apply initialData if given as second parameter.', t => {
  t.plan(1);

  let store = setupStoreWithInitialValues(),
    data = store.getData();

  t.deepEqual(data, initialData, 'check for loading initial data');
});

test('The method should get the the new and old data as parameter', t => {
  t.plan(2);

  let store = setupStoreUsingOldAndNew(),
    data = store.getData();

  t.deepEqual(data, {}, 'check for initialData');

  dispatcher.dispatch(actionType, newData);

  data = store.getData();
  t.deepEqual(data, {oldData: {}, newData: newData}, 'check for newData');
});
