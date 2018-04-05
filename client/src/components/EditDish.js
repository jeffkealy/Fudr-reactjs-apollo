import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';
import {dishesByYelpId} from './RestaurantDishes'

const EditDishLogs = true;

class EditDish extends Component{
  constructor(props){
    super(props)
    this.state = {
      dishName: '',
      photourl:'',
      dish:'',
      dishToEdit: '',
      vegetarian: false,
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
    vegetarian: nextProps.dish.vegetarian,
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
   const { dishName, photourl, photourlHash,vegetarian } = this.state
   const {dishToEdit} = this.state
   const restaurant_id = this.props.restaurantId
   const { _id, yelp_id, alias} = this.props.dish
   if (EditDishLogs)console.log("dishName, hash", dishName);
   if (EditDishLogs)console.log("dish", yelp_id, restaurant_id);
   this.props.cancelEdit()

   this.props.mutate({
      variables: {
        dish:{
          _id,
          dishName,
          photourl,
          photourlHash,
          restaurant_id,
          yelp_id,
          alias,
          vegetarian,
        }},
      optimisticResponse: {
        updateDish: {
          _id: _id,
          dishName: dishName,
          photourl: photourl,
          photourlHash:photourlHash ,
          restaurant_id,
          yelp_id,
          alias,
          vegetarian: vegetarian,
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

    });
  }

  render(){
    if (this.props.dishToEdit === this.props.index && this.props.isEditing === true) {
      return(
        <div className="edit-dish-container">

          <form className="edit-form" onSubmit={this.handleSubmit}>
            <div className="edit-form-button-container" >
              <input className="submit-edit-dish-button button-1" type="submit" value="Update" />
              <button className="cancel-edit-button button-1" onClick={this.props.cancelEdit}>Cancel</button>
            </div>
            <label>
              Dish Name:
              <input className="input-1" type="text"   name="dishName" value={this.state.dishName} onChange={this.handleChange()} required />
            </label>
            <label>
              Photo Url:
              <input className="input-1" type="text"  name="photourl" value={this.state.photourl} onChange={this.handleChange()} required />
            </label>
            <div>
              <span>vegetarian: yes if checked</span>
              <input
                type="checkbox"
                checked={this.state.vegetarian}
                onChange={(e) => this.setState({vegetarian:!this.state.vegetarian})}
                className="checkbox-1"
              />
            </div>

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
      alias
      vegetarian
    }
  }

`


export default graphql(updateDish)(EditDish)
