import React, {Component} from 'react';
import {camelizeKeys} from 'humps';
import {rounds} from '../constants';
import ScoreTable from './ScoreTable';

import './MatchCard.css'

const mockData = {
  id: 2018013,
  asahi_id: 2018080561,
  date: '2018-08-05',
  time: '13:00:00',
  round: 6,
  is_first_home: true,
  first_id: 2201,
  third_id: 3522,
  first_name: '広陵',
  third_name: '花咲徳栄',
  first_prefecture: '広島',
  third_prefecture: '埼玉',
  first_final_score: 4,
  third_final_score: 14,
  first_scores: [0, 1, 1, 0, 1, 1, 0, 0, 0],
  third_scores: [2, 0, 2, 0, 6, 4, 0, 0, 0]
}

const matchData = camelizeKeys(mockData)

export default class MatchCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowDetail: false,
    }
  }

  toggleShowDetail = () => {
    const {shouldShowDetail} = this.state

    this.setState({
      shouldShowDetail: !shouldShowDetail
    });
  }

  render() {
    const {shouldShowDetail} = this.state

    const {
      firstName,
      thirdName,
      firstPrefecture,
      thirdPrefecture,
      firstScores,
      thirdScores,
      firstFinalScore,
      thirdFinalScore,
      isFirstHome,
      round,
      time,
    } = matchData;

    const scoreTable = {
      first: {name: firstName, scores: firstScores, finalScore: firstFinalScore},
      third: {name: thirdName, scores: thirdScores, finalScore: thirdFinalScore},
      isFirstHome,
    }

    return (
      <div className="match-card">
        <div className="school-school">
          <div className="info clearfix">
            <div className="round-wrap">
              <i className="fa fa-bullhorn" />
              <span className="round">
                {rounds[round]}
              </span>
            </div>
            <div className="time-wrap">
              <i className="fa fa-clock-o" />
              <span className="time">
                {/* 13:00:00 -> 13:00 */}
                {time.slice(0, 5)}
              </span>
            </div>
          </div>
          <p className="first">
            <span className="prefecture">({firstPrefecture})</span>
            <span className="name">{firstName}</span>
            <span className="final-score">{firstFinalScore}</span>
          </p>
          <span className="vs">-</span>
          <p className="third">
            <span className="final-score">{thirdFinalScore}</span>
            <span className="name">{thirdName}</span>
            <span className="prefecture">({thirdPrefecture})</span>
          </p>
        </div>
        {shouldShowDetail ? <ScoreTable scoreTable={scoreTable}/> : null}
        {shouldShowDetail ? <div className="after-game hide">
          <a className="news"><i className="fa fa-link" />速報</a>
          <a className="video"><i className="fa fa-video-camera" />ビデオ</a>
        </div> : null}
        <div className="show-more" onClick={this.toggleShowDetail}>
          詳細
          {shouldShowDetail ?
            <span className="triangle-to-top" /> :
            <span className="triangle-to-bottom" />
          }
        </div>
      </div>
    );
  }
}
