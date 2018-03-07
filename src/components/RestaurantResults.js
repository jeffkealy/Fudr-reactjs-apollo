import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';

class RestaurantResults extends Component {
  constructor(props){
    super(props)
    this.state ={
      businesses: []
    }

  this.handleClick = this.handleClick.bind(this);

  }
  componentDidUpdate(props){
    if (this.state.businesses.length === 0) {
      let businesses = this.props.data.searchRestaurant.business
      this.setState({
        businesses: businesses
      })
    }
    console.log("componentDidUpdate", this.state);

  }
  handleClick(item, i){
    console.log(item, i);
    this.setState({
      businesses: [item]
    })
    console.log(this.state);
  }

  render(){
    console.log("RENDER");
    const { loading, error, searchRestaurant } = this.props.data
    if (loading) {
      return <p>Loading...</p>
    }
    if (error) {
      return <p>{error.message}</p>
    }
    if (this.state.businesses.length > 0) {
      console.log("Elements");
      return (
          <div>
            {this.state.businesses.map((item, i)=>(
            <button onClick={()=>this.handleClick(item, i)}  key={i}>

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
// term: props.submit.term,
// location: props.submit.location,

export default graphql(RestaurantResultsQuery, {
  options: (props) => ({
    variables: {
      term: 'lowry',
      location: 'minneapolis',
     },
  }),
})(RestaurantResults);
