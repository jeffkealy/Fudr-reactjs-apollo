import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import Dish from './Dish.js'
// import RestaurantAPI from './RestaurantAPI.js'
import SearchRestaurant from './SearchRestaurant'


class NewDish extends Component {

  state = {
    dishName: '',
    photourl: '',
    id:''
  }

  handleSave = ({ mutate }) => {
    const {dishName, photourl } = this.state;
    this.props.mutate({
      variables: {
        dish:{dishName, photourl}
      },
      // optimisticResponse: {
      //   addDish: {
      //     dishName,
      //     photourl,
      //     __typename: 'Dish',
      //   },
      // },
      // update: (store, { data: {addDish }}) => {
      //   console.log("store ADDDISH",store);
      //   const data = store.readQuery({ query: dishQuery });
      //   data.dishes.push(addDish);
      //   store.writeQuery({ query: dishQuery, data});
      // }
    })
    .then( res => {
      console.log(res.data.addDish);
      this.setState({
        dishName: '',
        photourl: '',
        id: res.data.addDish._id,
      });
    });


  }

  render () {
    return (
      <div className="AddDish">
        <SearchRestaurant />
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
        <button onClick={this.handleSave}
          >Save</button>
          <Dish dishID={this.state.id}/>
      </div>
    )
  }

}
const newDish = gql`
  mutation addDishMutation($dish:DishInput) {
    newDish(input:$dish ) {
      _id
      dishName
      photourl
      factual_id
    }
  }
`;

const AddNewDishWithMutation = graphql(newDish)(NewDish);

export default AddNewDishWithMutation;
