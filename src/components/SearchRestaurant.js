import React, {Component} from 'react';
import RestaurantResults from './RestaurantResults.js'

const SearchRestaurantLogs = false

class SearchRestaurant extends Component {
  state = {
    term: '',
    location: '',
    lookUpbuttonClicked: false,
    submit: {
      term: '',
      location: '',
      buttonClicked: false,
    },
  }
  handleSave = () => {
    this.setState({
      lookUpbuttonClicked: true,
      submit:{
        term: this.state.term,
        location: this.state.location,
        buttonClicked: true,


      }
    })
  if(SearchRestaurantLogs)  console.log("look up button",this.state);

  }

  render(){
    if(SearchRestaurantLogs) console.log("RENDER SearchRestaurant", this.state);
    if (this.state.lookUpbuttonClicked === false) {
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

        </div>
      )
    }
    if (this.state.lookUpbuttonClicked === true){
      return(
        <div>
          <button onClick={() => this.setState({lookUpbuttonClicked: false})}>Search Different Restaurant</button>
          {this.state.submit.buttonClicked &&
            <RestaurantResults
              submit = {this.state.submit}
             />
          }
        </div>
      )
    }
    else {
      return null
    }
  }
}



export default SearchRestaurant;
