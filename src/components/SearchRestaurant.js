import React, {Component} from 'react';
import RestaurantResults from './RestaurantResults.js'

class SearchRestaurant extends Component {
  state = {
    term: '',
    location: '',
    submit: {
      term: '',
      location: '',
    },
  }
  handleSave = () => {
    this.setState({
      submit:{
        term: this.state.term,
        location: this.state.location
      }
    })
    console.log(this.state);

  }
  render(){
      return (
          <div>
            <input
              value={this.state.term}
              placeholder='Restaurant'
              onChange={(e) => this.setState({term: e.target.value})}
            />
            <input
              value={this.state.location}
              placeholder='City/State/Zip'
              onChange={(e) => this.setState({location: e.target.value})}
            />
            <button onClick={this.handleSave}>Look Up</button>
              <RestaurantResults
                submit = {this.state.submit}
               />
          </div>
      )
  }
}



export default SearchRestaurant;
