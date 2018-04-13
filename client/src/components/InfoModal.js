import React, {Component} from 'react';
import Modal from 'react-modal';
import { gql, graphql } from 'react-apollo';
import '../styles/InfoModal.css'
import Info from 'react-icons/lib/md/info'
import Close from 'react-icons/lib/ti/delete-outline'


class InfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      hoursShowing: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.dayOfTheWeek = this.dayOfTheWeek.bind(this);
    this.editTime = this.editTime.bind(this);
    this.toggleHours = this.toggleHours.bind(this);
    this.isRestaurantOpen = this.isRestaurantOpen.bind(this);


  }
  componentWillMount() {
    Modal.setAppElement('body');

  }

  openModal() {
    this.setState({
      modalIsOpen: true,
    });
    console.log("MODAL openModal",this.state);

  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }
  toggleHours(){
    this.setState({hoursShowing:!this.state.hoursShowing})
  }
  isRestaurantOpen(restaurant){
    let d = new Date();
    let day = d.getDay();
    let hour = d.getHours();
    hour = hour*100
    let minutes = d.getMinutes()
    let time = hour + minutes
    let businessClosedAt = restaurant.hours[0].open[day].end
    let businessOpenAt = restaurant.hours[0].open[day].start
    businessClosedAt = parseInt(businessClosedAt, 10)
    businessOpenAt = parseInt(businessOpenAt, 10)
    console.log("time", time);
    if (businessClosedAt < businessOpenAt) {
      businessClosedAt = businessClosedAt +2400;
      console.log("businessOpenAt", businessOpenAt);
      console.log("businessClosedAt", businessClosedAt);
      if (time <= (businessClosedAt -2400)) {
        time = time +2400

      }
      if (time < businessClosedAt && time > businessOpenAt) {
        console.log("time", time);

        return "Open"
      } else {
        console.log("1st else");
        console.log("time", time);

        return "closed"
      }
    } else if (time < businessClosedAt && time > businessOpenAt) {
      console.log("elseif");
      console.log("time", time);
      console.log("businessOpenAt", businessOpenAt);
      console.log("businessClosedAt", businessClosedAt);
      return "Open"

    } else {
      console.log("2nd else");
      console.log("time", time);
      console.log("businessOpenAt", businessOpenAt);
      console.log("businessClosedAt", businessClosedAt);

      return "Closed"
    }
  }
  dayOfTheWeek(day){
            switch (day) {
          case 0:
            return "Monday";
          case 1:
            return "Tuesday";
          case 2:
            return "Wednesday";
          case 3:
            return "Thursday";
          case 4:
            return "Friday";
          case 5:
            return "Saturday";
          case 6:
            return "Sunday";
          default:
            return "error"
          }
  }
  editTime(time){
    let timeInt = parseInt(time, 10)
    if (timeInt > 1200) {
      timeInt = timeInt-1200
      if (timeInt < 1000){
        let hours = timeInt.toString().slice(0,1);
        let minutes = timeInt.toString().slice(1,3)
        let hoursAndMinutes = hours + ":" + minutes + " PM"
        return hoursAndMinutes
      } else {
        let hours = timeInt.toString().slice(0,2);
        let minutes = timeInt.toString().slice(2,4);
        let hoursAndMinutes = hours + ":" + minutes + " PM";
        return hoursAndMinutes
      }
    }else{
      if (timeInt < 1000){
        if (timeInt < 100 ) {
          timeInt = timeInt + 1200;
          let hours = timeInt.toString().slice(0,2);
          let minutes = timeInt.toString().slice(2,4);
          let hoursAndMinutes = hours + ":" + minutes + " AM"
          return hoursAndMinutes
        }else {
          let hours = timeInt.toString().slice(0,1);
          let minutes = timeInt.toString().slice(1,3)
          let hoursAndMinutes = hours + ":" + minutes + " AM"
          return hoursAndMinutes
        }
      } else {

        let hours = timeInt.toString().slice(0,2);
        let minutes = timeInt.toString().slice(2,4);
        let hoursAndMinutes = hours + ":" + minutes + " AM";
        return hoursAndMinutes
      }
    }
  }
  closeModal() {
    this.setState({
      modalIsOpen: false,
      hoursShowing: false,
    });
  }

  render() {
    const {loading, error, restaurant} = this.props.data;
    const currentDish = this.props.currentDish

    if (loading) {
        return <Info className="info-button-loading" />
      }
    if (error) {
      return <p>{error.message}</p>
    }
    // console.log("MODAL RENDER",this.props);

    return (
      <div className="info-modal-container">
        <button onClick={this.openModal} className="info-button icon-button-1"><Info className="info-icon" /></button>
        {this.state.modalIsOpen &&

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          closeTimeoutMS={700}
          className={{
            base: 'info modal',
            afterOpen: 'info modal-after-open',
            beforeClose: 'info modal-before-close'
          }}
          overlayClassName={{
            base: 'info modal-overlay',
            afterOpen: 'info modal-overlay-after-open',
            beforeClose: 'info modal-overlay-before-close'
          }}

        >
          <div>
            <div className="info-modal-header">
              <button onClick={this.closeModal} className='close-button icon-button-1'><Close className='close-icon' /></button>
              <h2 className="info-modal dish-name" ref={subtitle => this.subtitle = subtitle}>{this.props.currentDish.dishName}</h2>
            </div>
            <div className='info-modal image-container'>
              <img className='info-modal-image' src={currentDish.photourl} alt="dish"/>
            </div>
            <div className='info-modal restaurant-address'>
              <div>
                <h1 className='info-modal restaurant-name'>{restaurant.name}</h1>
              </div>
              <p>{restaurant.address}</p>
              <p>{restaurant.location.formatted_address}</p>
              <h3 className="openClosed">{this.isRestaurantOpen(restaurant)}</h3>

              <button className="hours-dropdown-button button-3" onClick={this.toggleHours}>
                <span>Hours</span>
              </button>

                {this.state.hoursShowing &&
                  <div className="info-modal-hours">
                  {restaurant.hours[0].open.map((oop, i)=>
                      <div key={i}>
                        <span>{this.dayOfTheWeek(oop.day)}: </span>
                        <span>{this.editTime(oop.start)} to </span>
                        <span>{this.editTime(oop.end)} </span>
                      </div>
                  )}
                  </div>
                }
            </div>
          </div>

          <div
            className='modal-image-container'
            style={{'backgroundImage':`url(${currentDish.photourl})`}}
              >
          </div>
        </Modal>
      }
      </div>
    );
  }
}



export const restaurantQuery = gql`
query RestaurantQuery ($_id: String) {
  restaurant ( _id: $_id) {
    _id
    name
    location{
      formatted_address
    }
    hours{
      open{
        start
        end
        day
      }
    }
  }
}
`;

export default graphql(restaurantQuery, {
  options: (props) => ({
    variables: { _id: props.restaurantID },
  }),
})(InfoModal)
