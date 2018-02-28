import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';

class EditDish extends Component{
  constructor(props){
    super(props)
    this.state = {
      inputDishName: '',
      inputPhotourl:'',
      editingDish: true,
      dishIndex: this.props.index,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editDish = this.editDish.bind(this);
  }
  handleChange = (i) => (event) => {
    const name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    });
 }

  handleSubmit(event) {
   event.preventDefault();
   console.log("State",this.state);
   console.log("props",this.props);

   // this.setState({
   //   inputDishName: '',
   //   inputPhotourl:'',
   // })
 }


  editDish = (i) => (event) =>{
    console.log("editdish", i);
    console.log("editdish", event);
    console.log("editDish", this.state.dishToEdit);
    this.setState((i)=>({
      editingDish: !this.state.editingDish,
    }))
  }



  render(){
    if (this.props.dishToEdit === this.props.index ) {
      const {dish} = this.props
      return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Dish Name:
              <input type="text" placeholder={dish.dishName}  name="inputDishName" value={this.state.inputDishName} onChange={this.handleChange(this.props.index)} />
            </label>
            <label>
              Photo Url:
              <input type="text" placeholder={dish.photourl} name="inputPhotourl" value={this.state.inputPhotourl} onChange={this.handleChange(this.props.index)} />
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
  mutation DishUpdateMutation ($id: String!){
    updateDish(_id: $id){
      dishName
      photourl
      restaurant_id
    }
  }

`
EditDish = graphql(updateDish, {
  name: 'DishUpdateMutation'

})(EditDish)

export default EditDish
