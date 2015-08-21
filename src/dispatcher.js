/**
 * The dispatcher acts as an event forwarder.
 * It takes every event called by the dispatch method and
 * calls all registered callbacks with that data submitted via the dispatch.
 *
 * One can register callback functions to the dispatcher.
 * All callback functions, even from different sources,
 * are called on each dispatch call.
 *
 * The registered callbacks are called with the two arguments provided via
 * the dispatch method call. The first one is unique `name` of the
 * dispatch and the second is tha data associated to that name of dispatch.
 */
export default class Dispatcher {
  constructor() {
    this.callbacks = [];
  }

  /**
   * Registers a callback function that should be called on each
   * dispatch method. The fucntion will be called with two arguments.
   * The name of the call and the assosiated data.
   *
   * @param {Function} callback The callback function.
   */
  register(callback) {
    if (typeof callback === 'function') {
      this.callbacks.push(callback);
    }
  }

  /**
   * Dispachtes a name and data to all registered callback functions.
   * The dispatch should at least get a unique name to identify the type of
   * data in the callback function. Data can be anything or undefined.
   *
   * @param {string} name The name of the dispatched data.
   * @param {*} data The data that should be dispatched.
   */
  dispatch(name, data) {
    this.callbacks.forEach(callback => {
      callback(name, data);
    });
  }
}
