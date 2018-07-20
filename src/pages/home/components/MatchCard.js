import React, {Component} from 'react';

export default class MatchCard extends Component {
  render() {
    return (
      <div className="match-card">
        <div className="school-school">
          <div className="info clearfix">
            <div className="round-wrap">
              <span className="round" />
            </div>
            <div className="time-wrap">
              <span className="time" />
            </div>
          </div>
          <p className="first">
            <span className="prefecture"></span>
            <span className="name"></span>
            <span className="final-score"></span>
          </p>
          <span className="vs">-</span>
          <p className="third">
            <span className="final-score"></span>
            <span className="name"></span>
            <span className="prefecture"></span>
          </p>
        </div>
        <table className="scoreboard hide">
          <tr className="home"></tr>
          <tr className="visit"></tr>
        </table>
        <div className="after-game hide">
          <a className="news"><i className="fa fa-link"></i>速報</a>
          <a className="video"><i className="fa fa-video-camera"></i>ビデオ</a>
        </div>
        <div className="show-more">
          詳細<span className="triangle-to-bottom"></span>
        </div>
      </div>
    );
  }
}
