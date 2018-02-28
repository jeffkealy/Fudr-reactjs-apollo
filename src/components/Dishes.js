import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';
import EditDish from './EditDish'

class Dishes extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputDishName: '',
      inputPhotourl:'',
      dishToEdit: '',
      editingDish: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editDish = this.editDish.bind(this);
  }

  handleChange = (i) => (event) => {

    const name = event.target.name;
    let value = event.target.value
    this.setState({
      [name]: value
    });
    console.log(event.target[i])
      console.log(i);


 }

  handleSubmit(event) {
   event.preventDefault();
   console.log("State",this.state);
   console.log("props",this.props);



   // this.props.mutate({
   //   variables:{}
   //
   //   }
   // })
  }
  editDish = (i) => (event) =>{
    console.log("editdish", i);
    this.setState({
      dishToEdit: i,
      editingDish: true,
    })
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
        <div className='card-image-test' key={i}>
          <img src={item.photourl} alt="asdf"/>
          <p>{item.dishName}</p>
          <p>{item._id}</p>
          <button onClick={this.editDish(i)}>Edit</button>

          <EditDish index={i}
                    dish={item}
                    dishToEdit={this.state.dishToEdit}
                    />
        </div>

        )
      )}
    </div>
    );
}
}

// <button onClick={this.editDish(i)}>Edit</button>

// <form className={this.state.dishToEdit ?  " ": "hidden" } onSubmit={this.handleSubmit}>
//   <label>
//     Dish Name:
//     <input type="text" placeholder={item.dishName}  name="inputDishName" value={this.state.inputDishName} onChange={this.handleChange(i)} />
//   </label>
//   <label>
//     Photo Url:
//     <input type="text" placeholder={item.photourl} name="inputPhotourl" value={this.state.inputPhotourl} onChange={this.handleChange(i)} />
//   </label>
//   <input type="submit" value="Submit" />
// </form>



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
