import React, {Component} from 'react';
import Modal from 'react-modal';
import './InfoModalStyle.css'

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
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    console.log(this);
  }
  componentWillMount() {
    Modal.setAppElement('body');
    console.log("CWM",this);

  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }


  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Info</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          closeTimeoutMS={700}
          className={{
            base: 'modal',
            afterOpen: 'modal-after-open',
            beforeClose: 'modal-before-close'
          }}
          overlayClassName={{
            base: 'modal-overlay',
            afterOpen: 'modal-overlay-after-open',
            beforeClose: 'modal-overlay-before-close'
          }}

        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <div>I am a modal</div>
          <button onClick={this.closeModal}>close</button>

        </Modal>
      </div>
    );
  }
}


export default InfoModal
