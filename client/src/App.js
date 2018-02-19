import React, { Component } from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import './App.css';
import SwipeCard from './components/SwipeCard'

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
        <div className="App" id="App">
          <header className="App-header">
            <h1 className="App-title">Fudr</h1>
          </header>
          <SwipeCard className="card"/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
