import React from 'react';
import { render } from 'react-dom';
import store from '../store/store';
 
class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date(), isToggleOn: true, propsRecord: '' };        
        console.log('*constructor*');
    }

    componentDidMount() {
        //ES5會有this issue: 無法存取到巢狀上一層的this,callback function根本沒有setState Method, 所以利用bind(this)解決
        /**
         * setInterval(function () {
              this.setState({
                  date: new Date()
              })
           }.bind(this), 1000);
         */
        //ES6的Arrow function則解決了此問題,預設就會存取到巢狀上一層的this
        this.timerID = setInterval(() => { 
            this.setState({
                date: new Date()
            })
        });
               
        //'this' issue: You need to save a reference to the context where the setTimeout/setInterval function call 
        //is made, because setTimeout/setInterval executes the function with this pointing to the global object
        //It ensure's this will be the correct object inside the callback. See Function.prototype.bind().
        /**
         * The bind() method creates a new function that, when called, has its this keyword set to the
         * provided value, with a given sequence of arguments preceding any provided when the new function is called.
         * fun.bind(thisArg[, arg1[, arg2[, ...]]])
         * thisArg: The value to be passed as the this parameter to the target function when the bound function is
         * called. The value is ignored if the bound function is constructed using the new operator.
         * Let's say:
         * =============================
         * this.x = 9;
           var module = {
               x: 81,
               getX: function() { return this.x; }
           };
           module.getX(); // 81
           var retrieveX = module.getX;
           retrieveX(); // returns 9 - The function gets invoked at the global scope

           // Create a new function with 'this' bound to module
           // New programmers might confuse the
           // global var x with module's property x
           var boundGetX = retrieveX.bind(module);
           boundGetX(); // 81
         */


        // This binding is necessary to make `this` work in the callback
        //this.handleClick = this.handleClick.bind(this);
        //this.handleClick = this.handleClick;

        // This syntax ensures `this` is bound within handleClick.
        // Warning: this is *experimental* syntax.
        
        this.handleClick = () => {
            this.setState((prevState, props) => ({
                isToggleOn: !prevState.isToggleOn,
                propsRecord: props.name
            }));
            console.log('this is:', this);
        }        
        
        console.log('*componentDidMount*');
        console.log(this.timerID);
    }    

    componentWillUnmount() {         
        console.log('*componentWillUnmount*');
        clearInterval(this.timerID);
    }    

    /* This binding is necessary to make `this` work in the callback   
    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }
    */

    render() {
        return (
        <div>
            <h1>Hello, {this.props.name}!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'On' : 'Off'}+ {':' + this.state.propsRecord}
            </button>
        </div>
        );
    }  
}
 
export default Hello