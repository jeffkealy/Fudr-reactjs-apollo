import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';
import {dishesByYelpId} from './RestaurantDishes'

const DeleteDishLogs = false

class DeleteDish extends Component{

  deleteDish = ({ mutate }) => {
    if(DeleteDishLogs)console.log("BUTTON delete", this.props);
    let {dishId, yelpId, deleteId }= this.props
    if(DeleteDishLogs)console.log(dishId, yelpId);
    this.props.mutate({
      variables: {_id: dishId},
      optimisticResponse: {
        deleteDish: {
          _id: dishId,
          __typename: 'Dish',
        }
      },
      update: (store, {data: {deleteDish}}) =>{
        if(DeleteDishLogs)console.log("deleteDish",deleteDish);
        const data = store.readQuery({
                                      query: dishesByYelpId,
                                      variables: {yelp_id: yelpId },
                                    });
        if(DeleteDishLogs)console.log("data",data.dishesByYelpId.length);
        data.dishesByYelpId.splice(deleteId,1);
        if(DeleteDishLogs)console.log("data after push",data.dishesByYelpId.length);
        store.writeQuery({ query: dishesByYelpId,
                            variables: {yelp_id: yelpId},
                           data});
       if(DeleteDishLogs)console.log("store ADDDISH", store);
      },

    })
    .then(res => {
      if(DeleteDishLogs)console.log("Deleted Dish res");
    })

  }
  render(){
    return(
      <button onClick={this.deleteDish}>Delete</button>
    )
  }
}

const deleteDish = gql`
  mutation DishUpdateMutation ($_id:String!){
    deleteDish(_id:$_id){
      _id
    }
  }

`

export default graphql(deleteDish)(DeleteDish)
