import React, {Component} from 'react';
import { gql, graphql, compose } from 'react-apollo';

class Dishes extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputDishName: '',
      inputPhotourl:'',
      editingDish: false,
      dishToEdit: "hidden",
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
    console.log("editdish", event);
    console.log("editDish", this.state.dishToEdit);
    this.setState({
      dishToEdit: " ",
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
          <form className={this.state.dishToEdit} onSubmit={this.handleSubmit}>
            <label>
              Dish Name:
              <input type="text" placeholder={item.dishName}  name="inputDishName" value={this.state.inputDishName} onChange={this.handleChange(i)} />
            </label>
            <label>
              Photo Url:
              <input type="text" placeholder={item.photourl} name="inputPhotourl" value={this.state.inputPhotourl} onChange={this.handleChange(i)} />
            </label>
            <input type="submit" value="Submit" />
          </form>
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

const updateDish = gql`
  mutation DishUpdateMutation ($id: String!){
    updateDish(_id: $id){
      dishName
      photourl
      restaurant_id
    }
  }

`

Dishes = compose(
  graphql(allDishesQuery,{name: 'DishesListQuery'}),
  graphql(updateDish, {
    name: 'DishUpdateMutation'

  })
)(Dishes);
export default graphql(allDishesQuery)(Dishes);
