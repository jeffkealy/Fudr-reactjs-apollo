import React, {Component} from 'react';
import { gql, graphql, compose } from 'react-apollo';
import RestaurantDishes from './RestaurantDishes'
import '../styles/RestaurantResults.css'

const RestaurantResultsLogs = true

class RestaurantResults extends Component {
  constructor(props){
    super(props)
    this.state ={
      businesses: [],
      yelp_id: '',
      restaurant:'',
      restaurant_id: "",
      alias:""
    }

  this.handleClick = this.handleClick.bind(this);
  if (RestaurantResultsLogs)console.log("Props", this.props);
  }
  componentWillReceiveProps(nextProps){
    if (!RestaurantResultsLogs)console.log("businesses", nextProps);
    if (nextProps.data.loading === false) {
      this.setState({
        businesses: nextProps.data.searchRestaurant.business
      })
    }

  }
  handleClick(item, i){
    if (!RestaurantResultsLogs)console.log("clicked restaurant, item:", item);
    this.setState({
      businesses: [item],
      yelp_id: item.id,
      alias:item.alias,
      restaurant: item,
    })
    if (RestaurantResultsLogs)console.log("Click state",this.state);
    if (RestaurantResultsLogs)console.log("Clicked",item);
    let restaurant = item
    this.props.mutate({
      variables: {
        BusinessInput: restaurant
      },
      optimisticResponse: {
        __typename:'Mutation',
        newRestaurant: restaurant
      },
      update: (store, { data: { newRestaurant} }) => {

      },
    })
    .then(res =>{
      this.setState({
        businesses: [],
        restaurant_id: res.data.newRestaurant._id,
      })
      if (RestaurantResultsLogs)console.log("Response addNewRestaurant", res);
      if (RestaurantResultsLogs)console.log("Response addNewRestaurant",this.state);

    })
  }

  render(){
    if (RestaurantResultsLogs)console.log("RENDER RestaurantResults");
    const { loading, error } = this.props.data
    if (loading) {
      return <p>Loading...</p>
    }
    if (error) {
      return <p>{error.message}</p>
    }
    if (this.state.businesses.length > 1) {
      return (
          <div className="restaurant-results">
            <div>Top 5 results</div>
            {this.state.businesses.map((item, i)=>(
            <button className="restaurant-results-button button-2" onClick={()=>this.handleClick(item, i)}  key={i}>

              <h2>{item.name}</h2>
              <p>{item.location.formatted_address}</p>

            </button>
              ))}


          </div>
      )
    }
    if (this.state.restaurant){
      return(
        <div>
          <h1>{this.state.restaurant.name}</h1>
          <p>{this.state.restaurant.location.formatted_address}</p>

          {this.state.yelp_id &&
            <RestaurantDishes yelpId={this.state.yelp_id}
                              restaurantId={this.state.restaurant_id}
                              alias={this.state.alias}
                              />
          }
        </div>
      )
    }
    else {
      return (
        <div>
          <h2>No restaurant found</h2>
        </div>
      )
    }
  }
}

const addNewRestaurant = gql`
  mutation addRestaurantMutation($BusinessInput:BusinessInput) {
    newRestaurant(input:$BusinessInput ) {
      name
      id
      phone
      _id
    }
  }
`;

export const RestaurantResultsQuery = gql`
query RestaurantResultsQuery ($term: String, $location: String) {
  searchRestaurant ( term: $term, location: $location){
    business  {
      name
      id
      alias
      is_claimed
      is_closed
      url
      phone
      display_phone
      review_count
      categories{
        title
        alias
      }
      rating
      price
      location{
        address1
        address2
        address3
        city
        state
        zip_code
        country
        formatted_address
      }
      coordinates{
        latitude
        longitude
      }
      photos
      hours {
        hours_type
        open{
          is_overnight
          end
          start
          day
        }
        is_open_now
      }
      distance
    }
  }
}
`;

// location: props.submit.location,

export default compose(
graphql(RestaurantResultsQuery, {
  options: (props) => ({
    variables: {
      term: props.submit.term,
      location: 55409,
     },
  }),
}),
graphql(addNewRestaurant)
)(RestaurantResults);
