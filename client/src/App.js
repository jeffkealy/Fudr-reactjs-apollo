import React, { Component } from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import './styles/App.scss';
import Restaurants from './components/Restaurants'
// import SwipeCard from './components/SwipeCard'

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom'
import Dishes from './components/Dishes'
import Header from './components/Header'

const isNotProduction = process.env.REACT_APP_NODE_ENV !== 'production';
const uri = isNotProduction ? 'http://localhost:4000/graphql' : process.env.REACT_APP_GRAPHQL_URI;
const networkInterface = createNetworkInterface({uri});

const client = new ApolloClient({
  addTypename: false,
  networkInterface,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App" id="App">
            <Header/>
            <Route path='/' exact={true}  component={Restaurants}/>
            <Route path='/Dishes' component={Dishes}/>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
