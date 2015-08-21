import isEqual from 'lodash.isequal';

/**
 * The component class implements a kind of frontend component.
 * This must not be a dom element but can also be a kind of logical component
 * that holds states and triggers actions.
 */
export default class Component {
  /**
   * Initialize the component. The constructor must be provided
   * with a stores object. The actions are not mandatory.
   * Some components might not need to trigger actions.
   *
   * Each value in the stores object should be an event emitting class.
   * The constructor iterates over the Object and adds a onChange
   * method to that store.
   *
   * @param {Object} stores The list of the stores to listen to.
   * @param {Object|null} actions The list of actions.
   */
  constructor(stores, actions) {
    this.stores = stores;
    this.actions = actions;

    this.state = {};

    Object.keys(this.stores).forEach(store => {
      this.stores[store].on('change', () => {
        this.onStoreChange(store);
      });
    });
  }

  /**
   * Handles changes to the store. This is called on each store change.
   * This is the enrty point for the component to react on changes to the store.
   *
   * This method must be implemented in the component.
   *
   * @param {string} store The name of the store that got changed.
   */
  onStoreChange(store) {} // eslint-disable-line

  /**
   * Handles component rendering if needed. Must not be implemented by the
   * child class. Only if update to the component after state change
   * is necessary.
   */
  render() {}

  /**
   * Handles state change to the component. Is called with the new state
   * that should be set to the component. No merging is implemented.
   * As of now the old state will be completely replaced by the new one.
   * Updating (not replacing) the state should be handled in the component
   * itself.
   *
   * After the state has changed the render function will be called.
   * As a second parameter a callback can be defined. If provied this function
   * will be called instead of render.
   *
   * If the new state is equal to the old one nothing will be set and called.
   *
   * @param {Object<*>}   newState The new state.
   * @param {Function} callback The callback function that should be called
   *                            instead of render.
   *
   * @return {*}
   */
  setState(newState, callback) {
    if (!isEqual(this.state, newState)) {
      this.state = newState;

      if (callback) {
        return callback();
      }

      this.render();
    }
  }
}
