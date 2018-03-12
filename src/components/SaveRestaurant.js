import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

class SaveRestaurant extends Component{

  render(){
    console.log("RENDER SaveRestaurant", this.props.yelpId[0]);
    this.props.mutate({

    })
    .then(res =>{

    })
    return null
  }

}
const newRestaurant = gql`
  mutation addRestaurantMutation($restaurant:RestaurantInput) {
    newRestaurant(input:$restaurant ) {
      name
      restaurant_id
    }
  }
`;

export const addNewRestaurant = graphql(newRestaurant)(SaveRestaurant)

export default addNewRestaurant;
