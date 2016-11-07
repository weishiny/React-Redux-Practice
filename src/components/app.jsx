import React from 'react'
import { render } from 'react-dom'
import Hello from './Hello'
 
class App extends React.Component {
    render() {
        return (
            <div>
                <Hello name={"Terrence"} />
                <Hello name={"Jos"} />
                <Hello name={"Andy"} />
                <Hello name={"Luke"} />
            </div>
        );
    }
}

render(<App />, document.getElementById('app'));
