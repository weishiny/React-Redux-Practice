/**
 * Advanced Guide
 */
import fetch from 'isomorphic-fetch';
/**
 * action types
 */
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

/**
 * action creators
 */

/**
 * Property value shorthand

   The new property value shorthand lets us abbreviate the initialization of a property within an object literal,
   provided that the property key matches an existing variable name. This was the first part of the ES6 code above:

    function getCar(make, model, value) {
        return {
            // with property value shorthand syntax, you can omit the property value if key matches variable name
            make,
            model,
            value
        };
    }
   The ES3/ES5 equivalent would be:
    function getCar(make, model, value) {
        return {
            make: make,
            model: model,
            value: value
        };
    }
 */
export function selectSubreddit(subreddit) { 
    return { type: SELECT_SUBREDDIT, subreddit }
}

export function invalidateSubreddit(subreddit) { 
    return { type: INVALIDATE_SUBREDDIT, subreddit }
}

export function requestPosts(subreddit) { 
    return { type: REQUEST_POSTS, subreddit }
}

export function receivePosts(subreddit, json) { 
    return { 
        type: RECEIVE_POSTS, 
        subreddit,
        posts: json.data.children.map(child => child.data), //return a new array
        receivedAt: Date.now()  
    }
}

//thunk action creator:
//use it just like any other action creator: store.dispatch(fetchPosts('reactjs'))
//by using this specific middleware, an action creator can return a function instead of 
//an action object.This way, the action creator becomes a thunk.
export function fetchPosts(subreddit) { 
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch) { 
        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(requestPosts(subreddit));

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.
        return fetch(`http://www.reddit.com/r/${subreddit}.json`)
            .then(response => response.json())
            .then(json =>
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                dispatch(receivePosts(subreddit, json))
            );

        // In a real world app, you also want to
        // catch any error in the network call.
    }
}