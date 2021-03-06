import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { buildEndpointUrl } from '../utilities';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class MyRequestsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newRequest: null,
      requests: null
    };

    this._createNewRequest = this._createNewRequest.bind(this);
    this._handleModalClose = this._handleModalClose.bind(this);
  }

  componentDidMount() {
    axios.get(buildEndpointUrl('requests/me')).then((res) => {
      this.setState({
        requests: res.data
      });
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="c-intro">
            <h1>Your Requests</h1>
          </div>
          <div className="c-profile">
            <button className="c-button" onClick={this._createNewRequest}>
              Create New Request
            </button>
          </div>
        </div>
        <div className="c-requests container">
          {(this.state.makers == null || this.state.makers.length === 0) && (
            <div className="c-list__items -none">No reqests</div>
          )}
          {this.state.makers != null && this.state.makers.length > 0 && (
            <div className="c-list__items">
              <div className="c-list__item -header">
                <div>Name</div>
                <div>Email</div>
                <div>Total Prints</div>
              </div>
              {this.state.makers.map((maker, key) => {
                return (
                  <div key={key} className="c-list__item">
                    <div>{maker.name}</div>
                    <div>{maker.email}</div>
                    <div>{maker.prints}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <Modal
          contentLabel="Add A Request"
          isOpen={this.state.newRequest != null}
          onRequestClose={this._handleModalClose}
          style={customStyles}
        >
          <div className="c-modal">
            {this.state.newRequest != null && <div></div>}
          </div>
        </Modal>
      </div>
    );
  }

  _createNewRequest(e) {
    e.preventDefault();

    this.setState({
      newRequest: {
        createDate: new Date(),
        userId: this.props.user._id
      }
    });
  }

  _handleModalClose() {
    this.setState({
      newRequest: null
    });
  }
}

export default MyRequestsView;
