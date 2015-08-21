import Events from 'events';

/**
 * The store creator is just a function returning a
 * class.
 *
 * The storeMessages parameter is a map of all the messages
 * the store should respond to.
 *
 * initialStoreData is used to fill the store with a inital
 * dataset and is optional.
 *
 * To create a new store pass storeMessages and optionally initialStoreData
 * to the creator function. This call will return a cass. This class must be
 * called with the dispatcher as argument.
 *
 * EXAMPLE:
 * file: `store.js`
 * ```js
 * import storeCreator from './storeCreator.js';
 * const initialStoreData = {
 *   status: 'OK',
 *   view: 'fair-at-link'
 * };
 * const storeMessages = new Map([
 *   ['messageType', (data, oldData) => updateStore(data, oldData)]
 *   ]);
 *
 * export default storeCreator(storeMessages, initialStoreData);
 * ```
 *
 * file: `main.js`
 * ```js
 * import Dispatcher from './dispatcher.js';
 *
 * import Store from './store.js';
 *
 * let dispatcher = new Dispatcher();
 * let store =  new Store(dispatcher);
 * ```
 *
 * @param {Map} storeMessages The actual store class which
 *                      implements the functionality of the store.
 * @param {Object} initialStoreData The data that should be set on creation.
 * @return {Class} The store class wich can be initialized.
 */
export default (storeMessages, initialStoreData) =>
class storeCreator extends Events.EventEmitter {
  /**
   * Initializes the store creator.
   * @param {Object} dispatcher The dispatcher
   */
  constructor(dispatcher) {
    super();

    this.data = {};

    if (initialStoreData) {
      this.data = initialStoreData;
    }

    this.registerDispatcher(dispatcher);
  }

  /**
   * Registers the store to the dispatcher.
   * The methods returned by `setMessageTypes` in the store will be called
   * when a matching message type is dispatched.
   * @param {Object} dispatcher The dispatcher object.
   */
  registerDispatcher(dispatcher) {
    dispatcher.register((messageName, messageData) => {
      if (storeMessages.has(messageName)) {
        const method = storeMessages.get(messageName);
        this.setData(method(messageData, this.getData()));
      }
    });
  }

  /**
   * Set the data in the store.
   * @param {Object} data The data to be stored.
   */
  setData(data) {
    this.data = data;
    this.emit('change');
  }

  /**
   * Returns the store data.
   * @return {Object} The data.
   */
  getData() {
    return this.data;
  }
};
