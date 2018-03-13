import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';
import EditDish from './EditDish'
import DeleteDish from './DeleteDish'
import AddDish from './AddDish'

class ResaurantDishes extends Component {
  constructor(props){
    super(props)
    this.state = {
      dishToEdit: '',
      isEditing: false,
      dishesByYelpId:[],
      yelp_id:'',
      restaurant_id: '',
    };
    this.editDish = this.editDish.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }
  // componentDidUpdate(){
  //   console.log("componentDidUpdate", this.props);
  //
  // }
  //
  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps", nextProps);
    console.log("componentWillReceiveProps this.props doesnt have dishesByYelpId");
    this.setState({
      dishesByYelpId: nextProps.data.dishesByYelpId,
      // yelp_id: nextProps.data.yelpId,
      // restaurant_id: nextProps.data.restaurantId,
    })
  }
  editDish = (i, item) => (event) =>{
    console.log("editdish", i, item);
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
    let {yelpId, restaurantId} = this.props
    console.log("RENDER RestaurantDishes", yelpId);
    console.log("RENDER this.props", this.props);
    if (loading) {
      console.log("loading props", this.props);
      return <p>Loading...</p>
    }
    if (error) {
      return <p>{error.message}</p>
    }
    if (yelpId) {
      console.log("MOUNT RestaurantDishes state", this.state);
      console.log("MOUNT this.props", this.props);

      console.log(yelpId);

      return (
        <div>
          <div></div>
          <AddDish yelpId={yelpId}
                   restaurantId = {restaurantId}
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

              <button className={this.state.isEditing? "hidden " :"edit-button"} onClick={this.editDish(i, item)}>Edit</button>

              <EditDish index={i}
                        dish={this.state.dish}
                        dishToEdit={this.state.dishToEdit}
                        isEditing={this.state.isEditing}
                        cancelEdit={this.cancelEdit}
                        >

                      </EditDish>
              <DeleteDish dishId = {item._id}
                          yelpId = {yelpId}
                          deleteId={i}
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
      restaurant_id
      yelp_id
    }
  }
`;



export default graphql(dishesByYelpId,{
  options: (props)=>({
    variables:{yelp_id: props.yelpId}
  }),
})(ResaurantDishes);
