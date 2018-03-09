import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
// import Dish from './Dish.js'
import {dishesByYelpId} from './RestaurantDishes'


class NewDish extends Component {
  constructor(props){
    super(props)
  console.log("addDish props.dishID", props);
    this.state = {
      dishName: '',
      photourl: '',
      yelp_id: '',
      dishID: '',
      addDishVisible: false,

    }
    console.log("state", this.state);
  }
  handleSave = ({ mutate }) => {
    console.log("BUTTON save ");
    const {_id, dishName, photourl, yelp_id } = this.state;
    this.props.mutate({
      variables: {
        dish:{_id, dishName, photourl, yelp_id}
      },
      optimisticResponse: {
        __typename: 'Mutation',
        newDish: {
          _id,
          dishName,
          photourl,
          yelp_id,
          __typename: 'Dish',
        },
      },
      // update: (store, { data: { newDish }}) => {
      //   console.log("store ADDDISH", store);
      //   const data = store.readQuery({ query: dishesByYelpId });
      //   console.log();
      //   data.dishes.push(newDish);
      //   store.writeQuery({ query: dishesByYelpId, data});
      // }
    })
    .then( res => {
      console.log("returned Dish", res);
      this.setState({
        dishName: '',
        photourl: '',
        dishID: res.data.newDish._id,
      });
    });


  }
  componentDidUpdate(){
    if (!this.state.yelp_id) {
      this.setState({
        yelp_id: this.props.yelpId
      })
    }

  }
  render () {
    const {yelpId} = this.props
    if (yelpId) {

      return (
        <div className="AddDish">
          <button onClick={() => this.setState({addDishVisible: true})}>Add New Dish</button>
            <div className={this.state.addDishVisible? '' : 'hidden'}>
              <button onClick={() => this.setState({addDishVisible: false})}>Cancel</button>
              <p>{this.state.yelp_id}</p>
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
              <button onClick={this.handleSave}>Save</button>
          </div>
        </div>
      )
    } else {
      return null
    }

  }

}
const newDish = gql`
  mutation addDishMutation($dish:DishInput) {
    newDish(input:$dish ) {
      _id
      dishName
      photourl
      yelp_id
    }
  }
`;

const AddNewDishWithMutation = graphql(newDish)(NewDish);

export default AddNewDishWithMutation;
