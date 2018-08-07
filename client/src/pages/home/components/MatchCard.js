import React, {Component} from 'react';
import {camelizeKeys} from 'humps';
import {rounds} from '../constants';
import ScoreTable from './ScoreTable';

import './MatchCard.css'
import {decodeScores, scoresToTotalScore} from '../../../lib/converter'

export default class MatchCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowDetail: false,
    }
  }

  componentDidMount(){
    const {game} = this.props;
    const gameTime = +game.time.split(':')[0];
    const currentDate = new Date();
    const currentTime = currentDate.getUTCHours() + 9;

    const diff = currentTime - gameTime;

    if (diff >= -1 && diff <= 4) {
      this.setState({
        shouldShowDetail: true,
      })
    }

  }

  toggleShowDetail = () => {
    const {shouldShowDetail} = this.state

    this.setState({
      shouldShowDetail: !shouldShowDetail
    });
  }

  render() {
    const {game, schools = [], prefectures = [], onShowSchool} = this.props;

    const matchData = camelizeKeys(game);

    const {shouldShowDetail} = this.state

    const {
      gameId,
      firstId,
      thirdId,
      firstScores,
      thirdScores,
      isFirstHome,
      round,
      time,
      videoId,
    } = matchData;

    const first = schools.length > 0 && schools.filter(school => {
      return school.school_id === firstId;
    })[0];


    const firstName = first && first.name;

    const third = schools.filter(school => {
      return school.school_id === thirdId;
    })[0];

    const firstPrefecture = prefectures.length && prefectures.filter(prefecture => {
      return prefecture.prefecture_id === first.prefecture_id;
    })[0].name;

    const thirdPrefecture = prefectures.length && prefectures.filter(prefecture => {
      return prefecture.prefecture_id === third.prefecture_id;
    })[0].name;

    const thirdName = third && third.name;

    const firstFinalScore = scoresToTotalScore(firstScores);
    const thirdFinalScore = scoresToTotalScore(thirdScores);

    const scoreTable = {
      first: {name: firstName, scores: decodeScores(firstScores), finalScore: firstFinalScore},
      third: {name: thirdName, scores: decodeScores(thirdScores), finalScore: thirdFinalScore},
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
          <p className="first" onClick={() => {onShowSchool(firstId)}}>
            <span className="prefecture">({firstPrefecture})</span>
            <span className="name">{firstName}</span>
            <span className="final-score">{firstFinalScore}</span>
          </p>
          <span className="vs">-</span>
          <p className="third" onClick={() => {onShowSchool(thirdId)}}>
            <span className="final-score">{thirdFinalScore}</span>
            <span className="name">{thirdName}</span>
            <span className="prefecture">({thirdPrefecture})</span>
          </p>
        </div>
        {shouldShowDetail ? <ScoreTable scoreTable={scoreTable}/> : null}
        {shouldShowDetail ? <div className="after-game hide">
          <a className="news" href={`https://vk.sportsbull.jp/koshien/text_sokuhou/${gameId}.html`}><i className="fa fa-link" />速報</a>
          <a className="video" href={`https://vk.sportsbull.jp/koshien/articles/${videoId}.html`}><i className="fa fa-video-camera" />ビデオ</a>
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
