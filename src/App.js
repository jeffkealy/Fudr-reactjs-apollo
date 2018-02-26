import React, { Component } from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import './App.css';
import SwipeCard from './components/SwipeCard'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Dishes from './components/Dishes'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  networkInterface,
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App" id="App">
            <header className="App-header">
              <h1 className="App-title">Füdr</h1>
            </header>
            <Route path='/' exact={true}  component={SwipeCard}/>
            <Route path='/Dishes' component={Dishes}/>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
