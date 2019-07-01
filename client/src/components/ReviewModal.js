import React, {Component} from 'react';
import Modal from 'react-modal';

import Restaurant from './Restaurant.js'

// import { gql, graphql } from 'react-apollo';
import '../styles/ReviewModal.css'
// import Close from 'react-icons/lib/ti/delete-outline'
import BackArrow from 'react-icons/lib/md/arrow-back'

class ReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,

    };

    this.reviewModalState = this.reviewModalState.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);


  }
  componentWillMount() {
    Modal.setAppElement('body');

  }

  reviewModalState() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });

    console.log("MODAL openModal",this.state);

  }

  afterOpenModal() {

  }
  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }
  render(){
    console.log("REviewmodal props", this.props);

    return(
      <div className="review-modal-container">
        <button onClick={this.reviewModalState} className="review-button action-button">Review</button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.reviewModalState}
          closeTimeoutMS={700}
          className={{
            base: 'review modal',
            afterOpen: 'review modal-after-open',
            beforeClose: 'review modal-before-close'
          }}
          overlayClassName={{
            base: 'review modal-overlay',
            afterOpen: 'review modal-overlay-after-open',
            beforeClose: 'review modal-overlay-before-close'
          }}
          bodyOpenClassName="review-modal--body"
          >
          <button onClick={this.closeModal} className='review-close-button icon-button-1'><BackArrow className='close-icon' /></button>

          <div className="review-container">
            <div className="review-modal-header">
              <h2>Review</h2>
            </div>

            {this.props.yesDishes.map((dish, i)=>
              <div className="review-item-container" key={i}>

                  <img className="review-item-image" src={dish.photourl} alt="review" />
                  <div className="review-item-details">
                    <div >{dish.dishName}</div>
                    <Restaurant
                      restaurantID={dish.restaurant_id}
                      openClosed={true}
                      />

                  </div>


              </div>
            )}
            <div>
            {this.props.yesDishes.length === 0 &&
              <h2>No Dishes Swiped Yet</h2>
            }
            </div>
          </div>

        </Modal>
      </div>
    )
  }
}

// export const restaurantQuery = gql`
// query RestaurantQuery ($_id: String) {
//   restaurant ( _id: $_id) {
//     _id
//     name
//     location{
//       formatted_address
//     }
//     hours{
//       open{
//         start
//         end
//         day
//       }
//     }
//   }
// }
// `;
//
// export default graphql(restaurantQuery, {
//   options: (props) => ({
//     variables: { _id: props.restaurantID },
//   }),
// })(ReviewModal)

export default ReviewModal
