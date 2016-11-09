import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import Hello from './Hello';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
 
class App extends React.Component {
    render() {
        return (
            <div>
                <Hello name={"Terrence"} />
                <Hello name={"Jos"} />
                <Hello name={"Andy"} />
                <Hello name={"Luke"} />
                <AddTodo />
                <VisibleTodoList />
                <Footer />
            </div>
        );
    }
}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
