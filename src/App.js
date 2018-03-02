import React, { Component } from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import './styles/App.css';
import SwipeCard from './components/SwipeCard'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Dishes from './components/Dishes'
import AddDish from './components/AddDish'


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
            <Route path='/AddDish' component={AddDish}/>

          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
