import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';
import EditDish from './EditDish'
import DeleteDish from './DeleteDish'
import AddDish from './AddDish'
import '../styles/RestaurantDishes.css'


const RestaurantDishesLogs = true;

class ResaurantDishes extends Component {
  constructor(props){
    super(props)
    this.state = {
      dishToEdit: '',
      isEditing: false,
      dishesByYelpId:[],
      yelp_id:'',
      restaurant_id: '',
      dish: {}
    };
    this.editDish = this.editDish.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if (true)console.log("componentWillReceiveProps", nextProps);
    if (RestaurantDishesLogs)console.log("componentWillReceiveProps this.props doesnt have dishesByYelpId");
    this.setState({
      dishesByYelpId: nextProps.data.dishesByYelpId,
    })
  }
  editDish = (i, item) => (event) =>{
    if (true)console.log("editdish", i, item);
    this.setState({
      dishToEdit: i,
      isEditing: true,
      dish: item,
    });
  }

  cancelEdit(){
    this.setState({
      isEditing: false,

    })
  }

  render(){
    const {loading, error} = this.props.data;
    let {yelpId, restaurantId, alias} = this.props
    if (loading) {
      if (RestaurantDishesLogs)console.log("loading props", this.props);
      return <p>Loading...</p>
    }
    if (error) {
      return <p>{error.message}</p>
    }
    if (yelpId) {
      if (RestaurantDishesLogs)console.log("RestaurantDishes state", this.state);
      if (RestaurantDishesLogs)console.log("RestaurantDishesprops", this.props);
      return (
        <div>
          <AddDish yelpId={yelpId}
                   restaurantId = {restaurantId}
                   alias={alias}

                   />

                 {this.state.dishesByYelpId.length === 0 &&
             <p>No Dishes Yet</p>
           }
          {this.state.dishesByYelpId.map((item, i) =>(
            <div className='dishes-list-entry' key={i}>
              <img src={item.photourl} alt={item.photourl}/>
              <p>{item.dishName}</p>
              <p>Dish_id: {item._id}</p>
              <p>photourl: {item.photourl}</p>
              <p>Restaurant ID: {item.restaurant_id}</p>
              <p>Yelp ID: {item.yelp_id}</p>
              <p>Alias: {item.alias}</p>
              {item.vegetarian &&
              <p>This is vegetarian</p>
              }
              {!item.vegetarian &&
              <p>This is not vegetarian</p>
              }
              <p>
                {
                  item.salty &&
                <span>Salty </span>
                }
                {
                  item.sweet &&
                <span>Sweet </span>
                }
              </p>
              <button className={this.state.isEditing? "hidden " :"update-dish-button button-1"} onClick={this.editDish(i, item)}>Update Dish</button>
              <EditDish index={i}
                        dish={this.state.dish}
                        photourlHash={item.photourlHash}
                        dishToEdit={this.state.dishToEdit}
                        isEditing={this.state.isEditing}
                        cancelEdit={this.cancelEdit}
                        restaurantId = {restaurantId}
                        >
                      </EditDish>
              <DeleteDish dishId = {item._id}
                          yelpId = {yelpId}
                          deleteId={i}
                          photourlHash={item.photourlHash}
                          isEditing={this.state.isEditing}
                          cancelEdit={this.cancelEdit}
                />
              </div>
              ))}
        </div>
      );
    } else {
      return <p>Else</p>
    }
  }
}





export const dishesByYelpId = gql`
  query dishesByYelpId($yelp_id: String) {
    dishesByYelpId(yelp_id:$yelp_id) {
      _id
      dishName
      photourl
      photourlHash
      restaurant_id
      yelp_id
      alias
      vegetarian
      salty
      sweet
    }
  }
`;



export default graphql(dishesByYelpId,{
  options: (props)=>({
    variables:{yelp_id: props.yelpId}
  }),
})(ResaurantDishes);
