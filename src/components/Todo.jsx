import React, { PropTypes } from 'react';

const Todo = ({ onClick, completed, text }) => (
    <li onClick={onClick} style={{textDecoration: completed ? 'line-through' : 'none'}}>
        {text}
    </li>
);

Todo.propTypes = {
    //PropTypes defines type and which props are required.
    onClick: PropTypes.func.isRequired, 
    completed: PropTypes.bool.isRequired, 
    text: PropTypes.string.isRequired
}

export default Todo;