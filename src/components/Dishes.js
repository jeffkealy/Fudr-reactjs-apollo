import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';
import EditDish from './EditDish'

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
  const {loading, error, allDishes} = this.props.DishesListQuery;

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <div>
      {allDishes.map((item, i) =>(
        <div className='dishes-list-entry' key={i}>
          <img src={item.photourl} alt="asdf"/>
          <p>{item.dishName}</p>
          <p>{item._id}</p>
          <p>{item.photourl}</p>

          <button className={this.state.isEditing? "hidden " :"edit-button"} onClick={this.editDish(i)}>Edit</button>

          <EditDish index={i}
                    dish={item}
                    dishToEdit={this.state.dishToEdit}
                    isEditing={this.state.isEditing}
                    cancelEdit={this.cancelEdit}
                    >

                  </EditDish>
        </div>

        )
      )}
    </div>
    );
}
}


export const allDishesQuery = gql`
  query DishesListQuery {
    allDishes {
      _id
      dishName
      photourl
      restaurant_id
    }
  }
`;



Dishes = graphql(allDishesQuery,{name: 'DishesListQuery'})(Dishes);
export default graphql(allDishesQuery)(Dishes);
