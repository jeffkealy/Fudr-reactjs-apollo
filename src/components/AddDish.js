import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
// import Dish from './Dish.js'
import {dishesByYelpId} from './RestaurantDishes'

const addDishLogs = true

class NewDish extends Component {
  constructor(props){
    super(props)
    this.state = {
      dishName: '',
      photourl: '',
      addDishVisible: false,

    }
  }

  addDish = () => {
    let {dishName, photourl } = this.state;
    let _id = ''
    let {yelpId,restaurantId} = this.props
    console.log("props", yelpId,restaurantId);
    this.props.mutate({
      variables: {
        dish:{
              _id: _id,
              dishName: dishName,
              photourl:photourl,
              yelp_id: yelpId,
              restaurant_id: restaurantId
            }
      },
      optimisticResponse: {
        addDish: {
          _id,
          dishName,
          photourl,
          yelp_id: yelpId,
          restaurant_id: restaurantId,
          __typename: 'Dish',
        },
      },
      update: (store, { data: { addDish }}) => {
        if(addDishLogs)console.log("CLICK addDish",addDish);
        console.log("yelp_id", yelpId);
        const data = store.readQuery({
                                      query: dishesByYelpId,
                                      variables: {yelp_id: yelpId},
                                    });
      if(addDishLogs)  console.log("data",data.dishesByYelpId.length);
        data.dishesByYelpId.push(addDish);
      if(addDishLogs)console.log("data after push",data.dishesByYelpId.length);
      console.log("yelp_id", yelpId);
      store.writeQuery({ query: dishesByYelpId,
                          variables: {yelp_id: yelpId},
                         data});
       if(addDishLogs)console.log("store ADDDISH", store);
       if(addDishLogs)console.log("data ADDDISH", data);
     },
    })
    .then( res => {
      if(addDishLogs)console.log("returned Dish", res);
      this.setState({
        dishName: '',
        photourl: '',
      });
      console.log("returned Dish State", this.state );
    });


  }
  componentWillMount(){
    console.log("componentWillMount");
  }
  // componentDidMount(){
  //   console.log("componentDidMount", this.state);
  // }
  // componentWillReceiveProps(nextProps){
  //   console.log("componentWillReceiveProps", nextProps);
  //     this.setState({
  //       dishesByYelpId: nextProps.dishesByYelpId
  //     })
  // }
  render () {
    const {yelpId, restaurantId} = this.props
    console.log("RENDER AddDish");

      return (
        <div className="AddDish">
          <button onClick={() => this.setState({addDishVisible: true})}>Add New Dish</button>
            <div className={this.state.addDishVisible? '' : 'hidden'}>
              <button onClick={() => this.setState({addDishVisible: false})}>Cancel</button>
              <p> yelp_id: {yelpId}</p>
              <p>restaurantId: {restaurantId}</p>
              <input
                value={this.state.dishName}
                placeholder='Dish name'
                onChange={(e) => this.setState({dishName: e.target.value})}
              />
              <input
                value={this.state.photourl}
                placeholder='Photo URL'
                onChange={(e) => this.setState({photourl: e.target.value})}
              />
            <button type="submit" onClick={this.addDish}>Save</button>
            </div>
        </div>
      )


  }

}
const addDish = gql`
  mutation addDishMutation($dish:DishInput) {
    addDish(input:$dish ) {
      _id
      dishName
      photourl
      yelp_id
      restaurant_id
    }
  }
`;

const AddNewDishWithMutation = graphql(addDish)(NewDish);

export default AddNewDishWithMutation;
