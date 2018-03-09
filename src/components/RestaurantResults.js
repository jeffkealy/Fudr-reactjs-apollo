import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';
import AddDish from './AddDish'
import RestaurantDishes from './RestaurantDishes'


class RestaurantResults extends Component {
  constructor(props){
    super(props)
    this.state ={
      businesses: [],
      yelp_id: '',
    }

  this.handleClick = this.handleClick.bind(this);

  }
  componentDidUpdate(){
    if (this.state.businesses.length === 0) {
      let business = this.props.data.searchRestaurant.business
      this.setState({
        businesses: business,
      })
    }
    console.log("componentDidUpdate", this.state.businesses);

  }
  handleClick(item, i){
    console.log("Click",item.id);
    this.setState({
      businesses: [item],
      yelp_id: item.id,
    })
  }

  render(){
    console.log("RENDER RestaurantResults");
    const { loading, error } = this.props.data
    if (loading) {
      return <p>Loading...</p>
    }
    if (error) {
      return <p>{error.message}</p>
    }
    if (this.state.businesses.length > 0) {
      return (
          <div>
            <p>Yelpid: {this.state.yelp_id}</p>
            {this.state.businesses.map((item, i)=>(
            <button onClick={()=>this.handleClick(item, i)}  key={i}>

              <h2>{item.name}</h2>
              <p>{item.location.formatted_address}</p>

            </button>
              ))}
            <AddDish yelpId={this.state.yelp_id} />
            <RestaurantDishes yelpId={this.state.yelp_id} />

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
