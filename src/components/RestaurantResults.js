import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';

class RestaurantResults extends Component {
  constructor(props){
    super(props)

  this.handleClick = this.handleClick.bind(this);

  }
  handleClick(i){
    console.log(i);
  }

  render(){
    const { loading, error, searchRestaurant } = this.props.data
    if (loading) {
      return <p>Loading...</p>
    }
    if (error) {
      return <p>{error.message}</p>
    }
    if (searchRestaurant) {
      let business = searchRestaurant.business

      return (
          <div>
            {business.map((item, i)=>(
            <button onClick={()=>this.handleClick(i)}  key={i}>

              <h2>{item.name}</h2>
              <p>{item.location.formatted_address}</p>

            </button>
              ))
            }
          </div>
      )
    }
    else {
      return null
    }
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
