import React, {Component} from 'react';
import { gql, graphql, compose } from 'react-apollo';
import RestaurantDishes from './RestaurantDishes'
// import SaveRestaurant from './SaveRestaurant'

class RestaurantResults extends Component {
  constructor(props){
    super(props)
    this.state ={
      businesses: [],
      yelp_id: '',
      restaurant:'',
      restaurant_id: "",
    }

  this.handleClick = this.handleClick.bind(this);
  console.log("Props", this.props);
  }
  componentWillReceiveProps(nextProps){
    console.log("businesses", nextProps);
    if (nextProps.data.loading === false) {
      this.setState({
        businesses: nextProps.data.searchRestaurant.business
      })
    }

  }
  handleClick(item, i){
    console.log("clicked restaurant");
    this.setState({
      businesses: [item],
      yelp_id: item.id,
      restaurant: item,
    })
    console.log("Click props",this.props);
    console.log("Click state",this.state);
    console.log("Clicked",item);
    let restaurant = item
    let _id =''
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
        restaurant_id: res.data.newRestaurant._id
      })
      console.log("Response addNewRestaurant", res);
      console.log("Response addNewRestaurant",this.state);

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
    if (this.state.businesses.length > 1) {
      return (
          <div>
            <p>Yelpid: {this.state.yelp_id}</p>
            {this.state.businesses.map((item, i)=>(
            <button onClick={()=>this.handleClick(item, i)}  key={i}>

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
                              restaurantId={this.state.restaurant_id}/>
          }
        </div>
      )
    }
    else {
      return null
    }
  }
}

// {this.state.yelp_id &&
//   <SaveRestaurant yelpId={this.state.businesses} />
// }
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
