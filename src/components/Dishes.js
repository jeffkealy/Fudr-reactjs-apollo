import React, {Component} from 'react';
import SearchRestaurant from './SearchRestaurant'

class Dishes extends Component {
  constructor(props){
    super(props)
    this.state = {
      dishToEdit: '',
      isEditing: false,
    };
    this.editDish = this.editDish.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.addDish = this.addDish.bind(this);
  }
  addDish(){
    console.log("addDish");
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
    console.log(this.state.isEditing);
  }

render(){
  return (
    <div>
      <SearchRestaurant />
    </div>
    );
}
}


//
// export const allDishesQuery = gql`
//   query DishesListQuery {
//     allDishes {
//       _id
//       dishName
//       photourl
//       restaurant_id
//     }
//   }
// `;



// Dishes = graphql(allDishesQuery)(Dishes);
export default Dishes;
