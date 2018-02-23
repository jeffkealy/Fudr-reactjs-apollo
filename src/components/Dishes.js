import React from 'react';
import { gql, graphql } from 'react-apollo';

const Dishes  = ({ data: { loading, error, dishes  }}) => {
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <ul>
      { dishes.map(item =>
      (<div key={item.id}>
        <img src="" alt={item.photourl}/>
        <span>{item.dishName}</span>

      </div>)
      )}
    </ul>
  );
}

export const dishesListQuery = gql`
  query DishesQuery {
    dishes {
      id
      dishName
      photourl
    }
  }
`;

export default graphql(dishesListQuery)(Dishes);
