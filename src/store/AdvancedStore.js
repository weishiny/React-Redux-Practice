import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { selectSubreddit, fetchPostsIfNeeded } from '../actions/AdvancedActions';
import rootReducer from '../reducers/AdvancedReducers';

const loggerMiddleware = createLogger();

let AdvancedStore = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
);

//For debug
//log the initial state
console.log(AdvancedStore.getState());

//Every time the state changes, log it
//Note that subscribe() returns a function for unregistering the listener
let unsubscribe = AdvancedStore.subscribe(() => {
    console.log(AdvancedStore.getState());
});

//dispatch some actions
AdvancedStore.dispatch(selectSubreddit('reactjs'));
AdvancedStore.dispatch(fetchPostsIfNeeded('reactjs')).then(() => {
    console.log('***Get Api Data Success-Store***');
    console.log(AdvancedStore.getState())
});
//stop listening to state updates
unsubscribe();

//export default AdvancedStore;