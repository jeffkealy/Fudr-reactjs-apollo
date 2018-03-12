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
      yelp_id: '',
      addDishVisible: false,
      restaurant_id: '',
      dishesByYelpId: []

    }
  }

  addDish = ({ mutate }) => {
    let {dishName, photourl, yelp_id, restaurant_id } = this.state;
    this.props.mutate({
      variables: {
        dish:{ dishName, photourl, yelp_id, restaurant_id}
      },
      optimisticResponse: {
        addDish: {
          dishName,
          photourl,
          yelp_id,
          restaurant_id,
          __typename: 'Dish',
        },
      },
      update: (store, { data: { addDish }}) => {
        if(addDishLogs)console.log("addDish",addDish);
        console.log("yelp_id", yelp_id);
        const data = store.readQuery({
                                      query: dishesByYelpId,
                                      variables: {yelp_id: yelp_id},
                                    });
      if(addDishLogs)  console.log("data",data.dishesByYelpId.length);
        data.dishesByYelpId.push(addDish);
      if(addDishLogs)console.log("data after push",data.dishesByYelpId.length);
      store.writeQuery({ query: dishesByYelpId,
                            variables: {yelp_id: yelp_id},
                           data});
       if(addDishLogs)console.log("store ADDDISH", store);
       if(addDishLogs)console.log("data ADDDISH", data);

       // this.setState({
       //   yelp_id: yelp_id
       // })
      }
    })
    .then( res => {
      if(addDishLogs)console.log("returned Dish", res);
      // this.setState({
      //   dishName: '',
      //   photourl: '',
      // });
      console.log("returned Dish State", this.state );
    });


  }
  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps", nextProps);
      this.setState({
        dishesByYelpId: nextProps.dishesByYelpId
      })
  }
  render () {
    const {yelpId, restaurantId} = this.props


      return (
        <div className="AddDish">
          <button onClick={() => this.setState({addDishVisible: true, yelp_id: yelpId, restaurant_id:restaurantId})}>Add New Dish</button>
            <div className={this.state.addDishVisible? '' : 'hidden'}>
              <button onClick={() => this.setState({addDishVisible: false})}>Cancel</button>
              <p> yelp_id: {this.state.yelp_id}</p>
              <p>restaurantId: {this.state.restaurant_id}</p>
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
            <button onClick={this.addDish}>Save</button>
          </div>
        </div>
      )


  }

}
const addDish = gql`
  mutation addDishMutation($dish:DishInput) {
    addDish(input:$dish ) {
      dishName
      photourl
      yelp_id
      restaurant_id
    }
  }
`;

const AddNewDishWithMutation = graphql(addDish)(NewDish);

export default AddNewDishWithMutation;
