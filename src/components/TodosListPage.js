import React, { Component } from 'react'
import { getTodos, addTodo, completeTodo } from '../Utils/api-utils.js';
import '../App.css';
export default class TodosListPage extends Component {
    state = {
        todos: [],
        todo: '',
        
    }

    componentDidMount = async () => {
        await this.fetchTodos();
    }

    fetchTodos = async () => {
        const todos = await getTodos(this.props.user.token);

        this.setState({todos});
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await addTodo(this.state.todo, this.props.user.token);

        await this.fetchTodos();

        this.setState({ todo: '' })
    }

    handleTodoChange = (e) => {
        this.setState({ todo: e.target.value })
    }

    handleComplete = async(todoId, todo) => {
        await completeTodo(todoId, this.props.user.token, todo);

        this.fetchTodos();
    }

    render() {        
        return (
            <div className="list">
                <h3><img src="https://media4.giphy.com/media/cPllju7ZjKHSYaNCQg/giphy.gif" alt="list"/></h3>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.todo} onChange={this.handleTodoChange} />
                    <button>Add todo</button>
                </form>
                {!this.state.todos.length && <p>Treat Yo Self, You're all caught up!</p>}
                {this.state.todos.map(todo => 
                    <p
                        key={`${todo.todo}-${todo.id}`} 
                        onClick={() => this.handleComplete(todo.id, todo.todo)}
                        className={`
                            todo ${todo.completed 
                                ? 'completed' 
                                : ''}`
                            }>    
                        {todo.todo}
                    </p>)}
            </div>
        )
    }
}