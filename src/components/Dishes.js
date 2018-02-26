import React from 'react';
import { gql, graphql } from 'react-apollo';

const Dishes  = ({ data: { loading, error, allDishes  }}) => {

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <div>
      {allDishes.map((item, i) =>(
        <div className='card-image-test' key={i}>
          <img src={item.photourl} alt="asdf"/>
            <p>{item.dishName}</p>
            <p>{item._id}</p>
        </div>
        )
      )}
    </div>
  );
}

export const allDishesQuery = gql`
  query DishesListQuery {
    allDishes {
      _id
      dishName
      photourl
      restaurant_id
    }
  }
`;

export default graphql(allDishesQuery)(Dishes);
