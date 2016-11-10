import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { selectSubreddit, fetchPosts } from '../actions/AdvancedActions';
import rootReducer from '../reducers/AdvancedReducers';

let AdvancedStore = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware // lets us dispatch() functions    
    )
);

/*For debug
//log the initial state
console.log(AdvancedStore.getState());

//Every time the state changes, log it
//Note that subscribe() returns a function for unregistering the listener
let unsubscribe = AdvancedStore.subscribe(() => {
    console.log(AdvancedStore.getState());
});

//dispatch some actions
AdvancedStore.dispatch(selectSubreddit('reactjs'));
AdvancedStore.dispatch(fetchPosts('reactjs')).then(() =>
    console.log(store.getState())
);
//stop listening to state updates
unsubscribe();
*/
//export default AdvancedStore;