import React from 'react';
import { gql, graphql } from 'react-apollo';

const RestaurantAPI  = ({ data: { loading, error, restaurant  }}) => {
  if (loading) {
    return <p>Loading...</p>

  }
  if (error) {
    return <p>{error.message}</p>
  }
  else {
    console.log("data",restaurant );

    return (
        <p>{restaurant}</p>
    )
  }

}

export const restaurantQuery = gql`
query RestaurantQuery ($id: String!) {
  business ( id: $id) {
    id
    name

  }
}
`;




export default graphql(restaurantQuery, {
  options: (props) => ({
    variables: { id: 'garaje-san-francisco' },
  }),
})(RestaurantAPI);
