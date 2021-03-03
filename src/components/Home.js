
import React, { Component } from 'react'
import '../App.css';
export default class Home extends Component {
    render() {
        return (
            <div className="home-wrapper">
                <div className="home">
                    <h1>Welcome To Your To-Do App.</h1>
                    <img src="https://media4.giphy.com/media/24FD07Vn2NsFkS6jyc/giphy.gif" alt="list"/>
                </div>
            </div>
        )
    }
}