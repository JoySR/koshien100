import React, {Component} from 'react';

export default class ModalCard extends Component {
  render() {
    return (
      <div id="card-bg modal-card">
        <div className="card-cover" />
        <div className="single-card">
          <div className="card-header clearfix">
            <h3 id="school-name" />
            <span id="school-prefecture" />
            <p id="school-count" />
            <span id="close" />
          </div>
          <table id="card-content" />
        </div>
      </div>
    );
  }
}
