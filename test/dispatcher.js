import test from 'tape';
import Dispatcher from '../src/dispatcher.js';

test('The dispatcher should register functions.', function(t) {
  t.plan(1);
  let dispatcher = new Dispatcher();
  const func = function() {};

  dispatcher.register(func);
  t.deepEqual([func], dispatcher.callbacks);
});

test('The dispatcher should dispatch to all registered callbacks.', function(t) {
  t.plan(4);

  let dispatcher = new Dispatcher();

  const message = 'message',
    data = 'data',
    func = function(receivedMessage, receivedData) {
      t.equal(message, receivedMessage);
      t.equal(data, receivedData);
    };

  dispatcher.register(func);
  dispatcher.register(func);

  dispatcher.dispatch(message, data);
});
