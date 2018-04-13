import React, {Component} from 'react';
import Modal from 'react-modal';
import { gql, graphql } from 'react-apollo';
import '../styles/ReviewModal.css'
import Close from 'react-icons/lib/ti/delete-outline'

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
    console.log("REviewmodal props", this.props);
    if (this.state.modalIsOpen) {
      this.props.reviewModalClosed()
    }
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
        <button onClick={this.reviewModalState} className="review-button button-1">Review</button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.reviewModalState}
          closeTimeoutMS={200}
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
          <div>
            <div className="review-modal-header">
              <button onClick={this.closeModal} className='review-close-button icon-button-1'><Close className='close-icon' /></button>
              <h2>Test</h2>
            </div>

          </div>

        </Modal>
      </div>
    )
  }
}

export default ReviewModal
