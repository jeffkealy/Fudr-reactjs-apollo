import React from 'react';
import { gql, graphql } from 'react-apollo';

import OpenClosed from './OpenClosed.js'


const Restaurant  = ({ data, restaurantID}) => {
  if (data.loading) {
    return <p>Loading...</p>

  }
  if (data.error) {
    return <p>{data.error.message}</p>
  }
  else {
    return (
      <div className="Restaurant-container">
        <p className="Restaurant-name">{data.restaurant.name}</p>
        <OpenClosed hours={data.restaurant.hours}/>
      </div>
    )
  }

}

export const restaurantQuery = gql`
query RestaurantQuery ($_id: String) {
  restaurant ( _id: $_id) {
    _id
    name
    location{
      formatted_address
    }
    hours{
      open{
        start
        end
        day
      }
    }
  }
}
`;




export default graphql(restaurantQuery, {
  options: (props) => ({
    variables: { _id: props.restaurantID },
  }),
})(Restaurant);
