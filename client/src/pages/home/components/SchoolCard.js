import React, {Component} from 'react';
import './SchoolCard.css';
import {
  dataIdToDataValue,
  dateIdToMonthDay,
  schoolInGamesToGamesInSchool,
  scoresToTotalScore
} from '../../../lib/converter'
import {rounds} from '../constants'

export default class SchoolCard extends Component {
  renderGames = () => {
    const {school, games=[], schools = []} = this.props;
    const {school_id} = school;

    const gamesOfSchool = schoolInGamesToGamesInSchool(school_id, games);

    return gamesOfSchool.map(game => {
      const {
        game_id,
        round,
        date_id,
        first_id,
        first_scores,
        third_scores,
        third_id
      } = game;

      return (
        <tr key={game_id}>
          <td>
            <span className="round">{rounds[round]}</span>
            <span className="date">({dateIdToMonthDay(date_id)})</span>
          </td>
          <td>
            <span className="first-name">
              {dataIdToDataValue({id: first_id, dataList: schools, fromKey: 'school_id'})}
            </span>
          </td>
          <td className="score">
            <span className="first-score">
              {scoresToTotalScore(first_scores)}
            </span>
            <span className="vs">-</span>
            <span className="third-score">
              {scoresToTotalScore(third_scores)}
            </span>
          </td>
          <td>
            <span className="third-name">
              {dataIdToDataValue({id: third_id, dataList: schools, fromKey: 'school_id'})}
            </span>
          </td>
          <td className="result">
            <a className="detail" id="s4-1">
              <i className="triangle-to-right" />詳細
            </a>
          </td>
        </tr>
      );
    })
  }

  render() {
    const {school, prefectures = [], onCloseCard} = this.props;
    if (!school) {return null}

    const {is_continual, last_count, name, prefecture_id, total_count} = school;

    // FIXME: 初出場？

    const prefecture = school && prefectures.length && prefectures.filter(prefecture => {
      return prefecture.prefecture_id === prefecture_id;
    })[0].name;

    return (
      <div id="card-bg">
        <div className="card-cover" />
        <div className="single-card">
          <div className="school-card-header">
            <h3 id="school-name">{name} <span id="school-prefecture">({prefecture})</span></h3>
            <p id="school-count">{last_count} 年{is_continual ? '連続' : 'ぶり'} {total_count} 回目</p>
            <span id="close" onClick={onCloseCard}><i className="fa fa-close" /></span>
          </div>
          <table id="card-content">
            <tbody>
              {this.renderGames()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
