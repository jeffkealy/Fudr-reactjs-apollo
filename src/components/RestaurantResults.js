import React from 'react';
import { gql, graphql } from 'react-apollo';

const RestaurantResults  = ({ data: { loading, error, searchRestaurant  }}) => {
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  if (searchRestaurant) {
    let business = searchRestaurant.business
    console.log(business);

    return (
        <div>
          {business.map((item, i)=>(
          <div key={i}>

            <h2>{item.name}</h2>
            <p>{item.location.formatted_address}</p>

          </div>
            ))
          }
        </div>
    )
  }
  else {
    return null
  }
}

export const RestaurantResultsQuery = gql`
query RestaurantResultsQuery ($term: String, $location: String) {
  searchRestaurant ( term: $term, location: $location){
    business  {
      id
      name
      phone
      location{
        formatted_address
      }
    }
  }
}
`;

export default graphql(RestaurantResultsQuery, {
  options: (props) => ({
    variables: {
      term: props.submit.term,
      location: props.submit.location,
     },
  }),
})(RestaurantResults);
