import React, { Component } from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import './styles/App.css';
import SwipeCard from './components/SwipeCard'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Dishes from './components/Dishes'
import NewDish from './components/NewDish'

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.REACT_APP_NODE_ENV", process.env.REACT_APP_NODE_ENV);

console.log("process.env.REACT_APP_GRAPHQL_URI", process.env.REACT_APP_GRAPHQL_URI);


const isNotProduction = process.env.REACT_APP_NODE_ENV !== 'production';
console.log("isNotProduction", isNotProduction);
const uri = isNotProduction ? 'http://localhost:4000/graphql' : process.env.REACT_APP_GRAPHQL_URI;
console.log("uri", uri);
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
            <header className="App-header">
              <h1 className="App-title">Füdr</h1>
            </header>
            <Route path='/' exact={true}  component={SwipeCard}/>
            <Route path='/Dishes' component={Dishes}/>
            <Route path='/NewDish' component={NewDish}/>

          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
