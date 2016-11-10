import { VisibilityFilters, SET_VISIBILITY_FILTER, ADD_TODO, TOGGLE_TODO } from '../actions/actions';
import { combineReducers } from 'redux';
const { SHOW_ALL } = VisibilityFilters;

const initialstate = {
    VisibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};

function VisibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

//we use ES6 Spread Operator (...) so that we can expand each element inside array.
//ex: 
//let cold = ['autumn', 'winter'];  
//let warm = ['spring', 'summer'];  
//construct an array
//[...cold, ...warm] // => ['autumn', 'winter', 'spring', 'summer']

//ex:
//function myFunction(x, y, z) { }
//var args = [0, 1, 2];
//myFunction(...args);

//z will receive number 3 rather than array whose value is 3
//function myFunction(v, w, x, y, z) { }
//var args = [0, 1];
//myFunction(-1, ...args, 2, ...[3]);

//if you don't use spread syntax, this array will become a two-dimension array'
//var arr1 = [0, 1, 2];
//var arr2 = [3, 4, 5];
//arr1.push(...arr2); 

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                //Array which contains multiple object will be expanded to each object. 
                //Otherwise it will return a 2-dimension array
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    });
                }
                return todo;
            });            
        default:
            return state;
    }
}

export const todoApp = combineReducers({
    VisibilityFilter,
    todos
});
//is equal to the following
/*
function todoApp(state = {}, action) {    
    return {
        VisibilityFilter: VisibilityFilter(state.VisibilityFilter, action),
        todos: todos(state.todos, action)
    };
}
*/

//Default function parameters allow formal parameters to be initialized with default values 
//if no value or undefined is passed
/*
function todoApp(state = initialstate, action) {
    switch (action.type) { 
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                //VisibilityFilter: action.Filter
                VisibilityFilter: VisibilityFilter(state.VisibilityFilter, action)
            });
        case ADD_TODO:
            
            //return Object.assign({}, state, {
            //    todos: [
            //        //using object spread operator
            //        //ex: let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
            //        //x; // 1
            //        //y; // 2
            //        //z; // { a: 3, b: 4 }
            //        ...state.todos,
            //        {
            //            text: action.text,
            //            completed: true
            //        }
            //    ] 
            //});
            
        case TOGGLE_TODO:
            return Object.assign({}, state, {
                todos: todos(state.todos, action)
                
                //        state.todos.map((todo, index) => {
                //    if (index === action.index) { 
                //        return Object.assign({}, todo, {
                //            completed: !todo.completed
                //        });
                //    }
                //    return todo;
                //})                
            })
        default:
            return state;
    }    
}
*/
/*
function todoApp(state, action) {
    if (typeof state === 'undefined') {
        return initialstate;
    }
    return state;
}
*/
