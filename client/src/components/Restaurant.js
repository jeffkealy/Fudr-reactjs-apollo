import React from 'react';
import { gql, graphql } from 'react-apollo';

import OpenClosed from './OpenClosed.js'


const Restaurant  = ({ data, restaurantID, openClosed, showOpenClosed}) => {
  if (data.loading) {
    return <p>Loading...</p>

  }
  if (data.error) {
    return <p>{data.error.message}</p>
  }
  else {
    // console.log("OpenClosed", restaurantID, openClosed);
    return (
      <div className="Restaurant-container">
        <p className="Restaurant-name">{data.restaurant.name}</p>
        {openClosed&&
          <OpenClosed hours={data.restaurant.hours}
                      restaurant={data.restaurant.name}
                      showOpenClosed={showOpenClosed}
            />
        }
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
