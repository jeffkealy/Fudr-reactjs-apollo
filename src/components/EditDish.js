import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';
import {dishesByYelpId} from './RestaurantDishes'


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
  console.log("componentWillReceiveProps", nextProps);
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
   console.log("SUBMIT edit",this.props);
   const { dishName, photourl, photourlHash } = this.state
   const {dishToEdit} = this.state
   const { _id, yelp_id, restaurant_id} = this.props.dish
   console.log("dishName, hash", dishName);
   console.log("dish", yelp_id, restaurant_id);
   this.props.mutate({
      variables: {
        dish:{
          _id,
          dishName,
          photourl,
          photourlHash,
        }},
      optimisticResponse: {
        updateDish: {
          _id: _id,
          dishName: dishName,
          photourl: photourl,
          photourlHash:photourlHash ,
          __typename: 'Dish',
        },
      },
      update: (store, { data: {updateDish }}) => {
          console.log("EditDish readQuery data", updateDish);
        const data = store.readQuery({
                                      query: dishesByYelpId,
                                      variables: {yelp_id:yelp_id},
                                    });

        data.dishesByYelpId.splice(dishToEdit,1, {dishName, photourl, restaurant_id, _id, yelp_id, photourlHash})
        console.log("data data", data );
                  store.writeQuery({ query: dishesByYelpId,
                                      variables: {yelp_id:yelp_id},
                                     data});
      },
    })
    .then( res => {
      console.log("EditDish res", res);
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
  mutation UpdateDishMutation ($dish:DishEditInput){
    updateDish(input:$dish){
      _id
      dishName
      photourl
      photourlHash
    }
  }

`


export default graphql(updateDish)(EditDish)
