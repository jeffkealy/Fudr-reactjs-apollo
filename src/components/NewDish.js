import React, { Component } from 'react';
import '../styles/NewDish.css';
import SearchRestaurant from './SearchRestaurant'

// import {dishQuery} from './Dish'
// import RestaurantAPI from './RestaurantAPI.js'


class NewDish extends Component {
  render () {
    return (
      <div className="NewDish">
        <SearchRestaurant />
      </div>
    )
  }
}

export default NewDish;
