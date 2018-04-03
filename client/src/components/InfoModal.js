import React, {Component} from 'react';
import Modal from 'react-modal';
import { gql, graphql } from 'react-apollo';
import '../styles/InfoModal.css'
import Info from 'react-icons/lib/md/info-outline'
import Close from 'react-icons/lib/ti/delete-outline'

// const customStyles = {
    // overlay: {
    //   position: 'fixed',
    //   top: 0,
    //   left: 0,
    //   right: 0,
    //   bottom: 0,
    //   backgroundColor: 'rgba(191, 27, 27, 0.8)',
      // transform:'scaleY(.01) scaleX(0)',
      // animation:'unfoldIn 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'
    //
    // },
    // content: {
    //   position: 'absolute',
    //   top: '40px',
    //   left: '40px',
    //   right: '40px',
    //   bottom: '40px',
    //   border: '1px solid #ccc',
    //   background: '#fff',
    //   overflow: 'auto',
    //   WebkitOverflowScrolling: 'touch',
    //   borderRadius: '4px',
    //   outline: 'none',
    //   padding: '20px',
      // transform:'scale(0)',
      // animation: 'zoomIn .5s .8s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'
  //   }
  // };

class InfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.dayOfTheWeek = this.dayOfTheWeek.bind(this)
    this.editTime = this.editTime.bind(this)

  }
  componentWillMount() {
    Modal.setAppElement('body');

  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
    console.log("MODAL openModal",this.state);

  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
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
    let timeInt = parseInt(time)
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
    this.setState({modalIsOpen: false});
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
    console.log("MODAL RENDER",this.props);

    return (
      <div>
        <button onClick={this.openModal} className="info-button button icon-button"><Info className="info-icon" /></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
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
              <button onClick={this.closeModal} className='close-button button icon-button'><Close className='close-icon' /></button>
              <span className="info-modal dish-name" ref={subtitle => this.subtitle = subtitle}>{this.props.currentDish.dishName}</span>
            </div>
            <div className='info-modal image-container'>
              <img className='info-modal-image' src={currentDish.photourl} alt="dish"/>
            </div>
            <div className='info-modal restaurant-address'>
              <h1 className='info-modal restaurant-name'>{restaurant.name}</h1>
              <p>{restaurant.address}</p>
              <p>{restaurant.location.formatted_address}</p>
                {restaurant.hours[0].open.map((oop, i)=>
                  <div key={i}>
                    <span>{this.dayOfTheWeek(oop.day)} </span>
                    <span>{this.editTime(oop.start)} to </span>
                    <span>{this.editTime(oop.end)} </span>
                  </div>
                )}


            </div>
          </div>
          <div
            className='modal-mage-container'
            style={{'backgroundImage':`url(${currentDish.photourl})`}}
              >
          </div>

        </Modal>
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
