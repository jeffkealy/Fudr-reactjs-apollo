import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
// import Dish from './Dish.js'
import {dishesByYelpId} from './RestaurantDishes'

const addDishLogs = false;

class NewDish extends Component {
  constructor(props){
    super(props)
    this.state = {
      dishName: '',
      photourl: '',
      addDishVisible: false,
      vegetarian: false,

    }
  }

  addDish = () => {
    let {dishName, photourl, vegetarian } = this.state;
    let _id = ''
    let photourlHash = ''
    let {yelpId,restaurantId,alias } = this.props
    console.log("CLICK addDish  props", this.props);
    console.log("CLICK addDish  state", this.state);
    this.setState({
      addDishVisible: false
    })
    this.props.mutate({
      variables: {
        dish:{
              _id: _id,
              dishName: dishName,
              photourl:photourl,
              photourlHash: photourlHash,
              yelp_id: yelpId,
              alias: alias,
              restaurant_id: restaurantId,
              vegetarian: vegetarian,
            }
      },
      optimisticResponse: {
        addDish: {
          _id,
          dishName,
          photourl,
          photourlHash,
          yelp_id: yelpId,
          alias: alias,
          restaurant_id: restaurantId,
          vegetarian: vegetarian,
          __typename: 'Dish',
        },
      },
      update: (store, { data: { addDish }}) => {
        if(addDishLogs)console.log("CLICK addDish",addDish);
        if(addDishLogs)console.log("yelp_id", yelpId);
        const data = store.readQuery({
                                      query: dishesByYelpId,
                                      variables: {yelp_id: yelpId},
                                    });
      if(addDishLogs)  console.log("data",data.dishesByYelpId.length);
        data.dishesByYelpId.push(addDish);
      if(addDishLogs)console.log("data after push",data.dishesByYelpId.length);
      if(addDishLogs)console.log("yelp_id", yelpId);
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
    });


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
    // console.log("RENDER AddDish");

      return (
        <div className="AddDish">
          <button className={this.state.addDishVisible? 'hidden' : 'add-new-dish-button button-1'} onClick={() => this.setState({addDishVisible: true})}>Add New Dish</button>
            <div className={this.state.addDishVisible? '' : 'hidden'}>
              <button className="cancel-add-new-dish-button button-1" onClick={() => this.setState({addDishVisible: false})}>Cancel</button>
              <p> yelp_id: {yelpId}</p>
              <p>restaurantId: {restaurantId}</p>
              <input
                value={this.state.dishName}
                placeholder='Dish name'
                onChange={(e) => this.setState({dishName: e.target.value})}
                className="input-1"
              />
              <input
                value={this.state.photourl}
                placeholder='Photo URL'
                onChange={(e) => this.setState({photourl: e.target.value})}
                className="input-1"
              />
            <div>
              <span>vegetarian? Yes if checked</span>
              <input
                type="checkbox"
                checked={this.state.vegetarian}
                onChange={(e) => this.setState({vegetarian:!this.state.vegetarian})}
                className="checkbox-1"
              />
            </div>
            <button className="save-new-dish-button button-1" type="submit" onClick={this.addDish}>Save</button>
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
      photourlHash
      yelp_id
      alias
      restaurant_id
      vegetarian
    }
  }
`;

const AddNewDishWithMutation = graphql(addDish)(NewDish);

export default AddNewDishWithMutation;
