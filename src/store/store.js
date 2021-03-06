import { createStore } from 'redux';
import { todoApp } from '../reducers/reducers';

import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from '../actions/actions';

let store = createStore(todoApp);
/* For debug
//log the initial state
console.log(store.getState());

//Every time the state changes, log it
//Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

//dispatch some actions
store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(addTodo('Learn about store'));

store.dispatch(toggleTodo(0));
store.dispatch(toggleTodo(1));

store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

//stop listening to state updates
unsubscribe();
*/
export default store;