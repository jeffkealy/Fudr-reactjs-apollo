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
  componentWillMount(){
    console.log("componentWillMount", this.props);

  }

  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps", nextProps);
    console.log("componentWillReceiveProps", this.props);
    this.setState({
      dishesByYelpId: nextProps.data.dishesByYelpId,
      // yelp_id: nextProps.data.yelpId,
      // restaurant_id: nextProps.data.restaurantId,
    })
  }
  editDish = (i) => (event) =>{
    console.log("editdish", i);
    this.setState({
      dishToEdit: i,
      isEditing: true,
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
    console.log("RENDER this.state.dishesByYelpId", this.state.dishesByYelpId);
    if (loading) {
      return <p>Loading...</p>
    }
    if (error) {
      return <p>{error.message}</p>
    }
    if (yelpId && this.state.dishesByYelpId) {
      console.log("RENDER RestaurantDishes state", this.state);
      console.log(yelpId);
      return (
        <div>
          <AddDish yelpId={yelpId}
                   restaurantId = {restaurantId}
                   dishesByYelpId = {this.state.dishesByYelpId}/>

           {this.state.dishesByYelpId.length === 0 &&
             <p>No Dishes Yet</p>
           }
          {this.state.dishesByYelpId.map((item, i) =>(
            <div className='dishes-list-entry' key={i}>
              <img src={item.photourl} alt={item.photourl}/>
              <p>{item.dishName}</p>
              <p>Dish_id: {item._id}</p>
              <p>photourl: {item.photourl}</p>

              <button className={this.state.isEditing? "hidden " :"edit-button"} onClick={this.editDish(i)}>Edit</button>

              <EditDish index={i}
                        dish={item}
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

            )
          )}
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
