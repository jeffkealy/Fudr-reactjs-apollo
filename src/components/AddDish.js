import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import {allDishesQuery} from './Dishes'


class AddDish extends Component {
  state = {
    dishName: '',
    photourl: ''
  }

  handleSave = ({ mutate }) => {
    const {dishName, photourl } = this.state;
    const id = require('crypto').randomBytes(5).toString('hex');
    this.props.mutate({
      variables: {id, dishName, photourl},
      optimisticResponse: {
        addDish: {
          id,
          dishName,
          photourl,
          __typename: 'Dish',
        },
      },
      update: (store, { data: {addDish }}) => {
        const data = store.readQuery({ query: allDishesQuery });
        data.dishes.push(addDish);
        store.writeQuery({ query: allDishesQuery, data});
      }
    })
    .then( res => {
      this.setState({
        dishName: '',
        photourl: ''
      });
    });
  }

  render () {
    return (
      <div>
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
    )
  }

}

const createDish = gql`
  mutation addDish($id: String!, $dishName: String!, $photourl: String!) {
    addDish(id: $id, dishName: $dishName, photourl: $photourl ) {
      id
      dishName
      photourl
    }
  }
`;

const AddDishesWithMutation = graphql(createDish)(AddDish);

export default AddDishesWithMutation;
