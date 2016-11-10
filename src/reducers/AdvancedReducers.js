import { combineReducers } from 'redux';
import { SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS } from '../actions/AdvancedActions';

function selectedSubreddit(state = 'reactjs', action) {
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state;
    }
}

const initialpostsstate = {
    isFetching: false,
    didInvalidate: false,
    items: []
};

//The Object.assign() method is used to copy the values of all enumerable own properties from one or more source 
//objects to a target object.It will return the target object.
//Object.assign(target, ...sources)
//Ex:
//
//var obj = { a: 1 };
//var copy = Object.assign({}, obj);
//console.log(copy); // { a: 1 }
//    Merging objects:
//var o1 = { a: 1 }; var o2 = { b: 2 }; var o3 = { c: 3 };
//var obj = Object.assign(o1, o2, o3);
//console.log(obj); // { a: 1, b: 2, c: 3 }
//console.log(o1);  // { a: 1, b: 2, c: 3 }, target object itself is changed.
//    Merging objects with same properties
//(The properties are overwritten by other objects that have the same properties later in the parameters order.)
//var o1 = { a: 1, b: 1, c: 1 }; var o2 = { b: 2, c: 2 }; var o3 = { c: 3 };
//var obj = Object.assign({}, o1, o2, o3);
//console.log(obj); // { a: 1, b: 2, c: 3 }


function posts(state = initialpostsstate, action) { 
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

function postsBySubreddit(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
        case REQUEST_POSTS:
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                //we use ES6 computed property syntax
                [action.subreddit]: posts(state[action.subreddit], action)
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    selectedSubreddit,
    postsBySubreddit
});

export default rootReducer;