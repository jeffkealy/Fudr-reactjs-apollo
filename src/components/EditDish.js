import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';
import {allDishesQuery} from './Dishes'

class EditDish extends Component{
  constructor(props){
    super(props)
    console.log(this.props);
    this.state = {
      dishName: '',
      photourl:'',
      editingDish: this.props.isEditing,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (i) => (event) => {
    const name = event.target.name;
    let value = event.target.value;
    console.log(value);
    this.setState({
      [name]: value
    })

 }

  handleSubmit = (event, {mutate}) => {
   event.preventDefault();
   console.log("State",this.state);
   const { dishName, photourl } = this.state
   const { _id} = this.props.dish
   console.log("dishName", dishName);
   this.props.mutate({
      variables: {
        dish:{
          _id: _id,
          dishName: dishName,
          photourl: photourl,
        }},
      optimisticResponse: {
        updateDish: {
          _id: _id,
          dishName: dishName,
          photourl: photourl,
          __typename: 'Dish',
        },
      },
      update: (store, { data: {updateDish }}) => {
        const data = store.readQuery({ query: allDishesQuery });
        store.writeQuery({ query: allDishesQuery, data});
      }
    })
    .then( res => {
      console.log("THEN");
      this.props.cancelEdit()
      this.setState({
        dishName: '',
        photourl:'',
      });
    });
  }

  render(){
    if (this.props.dishToEdit === this.props.index && this.props.isEditing === true) {
      const {dish} = this.props
      return(
        <div className="edit-form-container">
        <button className="edit-button" onClick={this.props.cancelEdit}>Cancel</button>

          <form onSubmit={this.handleSubmit}>
            <label>
              Dish Name:
              <input type="text" placeholder={dish.dishName}  name="dishName" value={this.state.dishName} onChange={this.handleChange(this.props.index)} required />
            </label>
            <label>
              Photo Url:
              <input type="text" placeholder={dish.photourl} name="photourl" value={this.state.photourl} onChange={this.handleChange(this.props.index)} required />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    } else{
      return null
    }
  }
}

const updateDish = gql`
  mutation DishUpdateMutation ($dish:DishInput){
    updateDish(input:$dish){
      _id
      dishName
      photourl
    }
  }

`


export default graphql(updateDish)(EditDish)
