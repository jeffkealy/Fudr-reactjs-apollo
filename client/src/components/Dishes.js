import React, {Component} from 'react';
import SearchRestaurant from './SearchRestaurant'


class Dishes extends Component {
  render(){
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">FüDR</h1>
        </header>
        <SearchRestaurant/>
      </div>
      );
  }
}

export default Dishes;
