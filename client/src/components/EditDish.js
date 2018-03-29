import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';
import {dishesByYelpId} from './RestaurantDishes'

const EditDishLogs = false;

class EditDish extends Component{
  constructor(props){
    super(props)
    this.state = {
      dishName: '',
      photourl:'',
      dish:'',
      dishToEdit: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

componentWillReceiveProps(nextProps){
if (true)console.log("componentWillReceiveProps EditDish", nextProps);
  this.setState({
    dishToEdit: nextProps.dishToEdit,
    dishName: nextProps.dish.dishName,
    photourl: nextProps.dish.photourl,
    photourlHash: nextProps.dish.photourlHash,
  })
}

  handleChange = (i) => (event) => {
    const name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
      dish: this.props.dish
    })

 }

  handleSubmit = (event, {mutate}) => {
   event.preventDefault();
   if (EditDishLogs)console.log("SUBMIT edit props",this.props);
   if (true)console.log("SUBMIT edit state",this.state);
   const { dishName, photourl, photourlHash } = this.state
   const {dishToEdit} = this.state
   const { _id, yelp_id, restaurant_id} = this.props.dish
   if (EditDishLogs)console.log("dishName, hash", dishName);
   if (EditDishLogs)console.log("dish", yelp_id, restaurant_id);
   this.props.mutate({
      variables: {
        dish:{
          _id,
          dishName,
          photourl,
          photourlHash,
          restaurant_id,
          yelp_id,
        }},
      optimisticResponse: {
        updateDish: {
          _id: _id,
          dishName: dishName,
          photourl: photourl,
          photourlHash:photourlHash ,
          restaurant_id,
          yelp_id,
          __typename: 'Dish',
        },
      },
      update: (store, { data: {updateDish }}) => {
          if (EditDishLogs)console.log("EditDish readQuery data", updateDish);
        const data = store.readQuery({
                                      query: dishesByYelpId,
                                      variables: {yelp_id:yelp_id},
                                    });
        data.dishesByYelpId.splice(dishToEdit,1, updateDish)
        if (EditDishLogs)console.log("data data", data );
                  store.writeQuery({ query: dishesByYelpId,
                                      variables: {yelp_id:yelp_id},
                                     data});
      },
    })
    .then( res => {
      if (EditDishLogs)console.log("EditDish res", res);
      if (EditDishLogs)console.log("res.data.updateDish.photourl", res.data.updateDish.photourl);
      this.setState({
        photourl: res.data.updateDish.photourl,
      });
      this.props.cancelEdit()

    });
  }

  render(){
    if (this.props.dishToEdit === this.props.index && this.props.isEditing === true) {
      return(
        <div className="edit-form-container">
        <button className="edit-button" onClick={this.props.cancelEdit}>Cancel</button>

          <form onSubmit={this.handleSubmit}>
            <label>
              Dish Name:
              <input type="text"   name="dishName" value={this.state.dishName} onChange={this.handleChange()} required />
            </label>
            <label>
              Photo Url:
              <input type="text"  name="photourl" value={this.state.photourl} onChange={this.handleChange()} required />
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
  mutation UpdateDishMutation ($dish:DishEditInput){
    updateDish(input:$dish){
      _id
      dishName
      photourl
      photourlHash
      restaurant_id
      yelp_id
    }
  }

`


export default graphql(updateDish)(EditDish)