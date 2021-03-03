import React, { Component } from 'react'
import './App.css';
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
} from 'react-router-dom';
import Header from './components/Header.js';
import PrivateRoute from './components/PrivateRoute.js';
import Home from './components/Home.js';
import SignUpPage from './components/SignUpPage.js';
import LoginPage from './components/LoginPage.js';
import TodosListPage from './components/TodosListPage.js';
import { getUser, storeUser} from './Utils/local-storage-utils';

export default class App extends Component {
    state = {
      user: getUser()
    }

    handleUserChange = (user) => {
      this.setState({ user })
      
      storeUser(user);
    }

    handleLogout = () => {
      this.handleUserChange();
    }

    render() {
      const { user } = this.state;
        return (
            <div>
                <Router>
                  <Header
                    user={this.state.user}
                    handleLogout={this.handleLogout}/>
                    <Switch>
                        <Route 
                            path="/" 
                            exact
                            render={(routerProps) => <Home {...routerProps} />} 
                        />
                        <PrivateRoute 
                            path="/todos" 
                            exact
                            token={user && user.token}
                            render={(routerProps) => 
                              <TodosListPage 
                                user={this.state.user}
                                {...routerProps} 
                              />} 
                        />
                        <Route 
                          path="/login" 
                          exact
                          render={(routerProps) => 
                            <LoginPage 
                              handleUserChange={this.handleUserChange}
                              {...routerProps} 
                            />} 
                        />
                        <Route 
                          path="/signup" 
                          exact
                          render={(routerProps) => 
                            <SignUpPage 
                              handleUserChange={this.handleUserChange}
                              {...routerProps} 
                            />} 
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}
