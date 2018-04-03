import React from 'react';
import { gql, graphql } from 'react-apollo';

const Restaurant  = ({ data}) => {
  if (data.loading) {
    return <p>Loading...</p>

  }
  if (data.error) {
    return <p>{data.error.message}</p>
  }
  else {
    // console.log("Restaurant",data);

    return (
        <p>{data.restaurant.name}</p>
    )
  }

}

export const restaurantQuery = gql`
query RestaurantQuery ($_id: String!) {
  restaurant ( _id: $_id) {
    _id
    name
    location{
      formatted_address
    }
  }
}
`;




export default graphql(restaurantQuery, {
  options: (props) => ({
    variables: { _id: props.restaurantID },
  }),
})(Restaurant);
