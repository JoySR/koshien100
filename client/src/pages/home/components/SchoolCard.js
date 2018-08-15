import React, {Component} from 'react';
import './SchoolCard.css';
import {
  dataIdToDataValue,
  dateIdToMonthDay,
  schoolInGamesToGamesInSchool,
  scoresToTotalScore,
} from '../../../lib/converter';
import {rounds} from '../constants';

export default class SchoolCard extends Component {
  renderGames = () => {
    const {school, games = [], schools = []} = this.props;
    const {schoolId} = school;

    const gamesOfSchool = schoolInGamesToGamesInSchool(schoolId, games);

    return gamesOfSchool.map(game => {
      const {
        gameId,
        round,
        dateId,
        firstId,
        firstScores,
        thirdScores,
        thirdId,
      } = game;

      return (
        <tr key={gameId}>
          <td>
            <span className="round">{rounds[round]}</span>
            <span className="date">({dateIdToMonthDay(dateId)})</span>
          </td>
          <td>
            <span className="first-name">
              {dataIdToDataValue({
                id: firstId,
                dataList: schools,
                fromKey: 'schoolId',
              })}
            </span>
          </td>
          <td className="score">
            <span className="first-score">
              {scoresToTotalScore(firstScores)}
            </span>
            <span className="vs">-</span>
            <span className="third-score">
              {scoresToTotalScore(thirdScores)}
            </span>
          </td>
          <td>
            <span className="third-name">
              {dataIdToDataValue({
                id: thirdId,
                dataList: schools,
                fromKey: 'schoolId',
              })}
            </span>
          </td>
          <td className="result">
            <a className="detail" id="s4-1">
              <i className="triangle-to-right" />
              詳細
            </a>
          </td>
        </tr>
      );
    });
  };

  render() {
    const {school, prefectures = [], onCloseCard} = this.props;
    if (!school) {
      return null;
    }

    const {isContinual, lastCount, name, prefectureId, totalCount} = school;

    // FIXME: 初出場？

    const prefecture =
      school &&
      dataIdToDataValue({
        id: prefectureId,
        fromKey: 'prefectureId',
        dataList: prefectures,
      });

    return (
      <div id="card-bg">
        <div className="card-cover" />
        <div className="single-card">
          <div className="school-card-header">
            <h3 id="school-name">
              {name} <span id="school-prefecture">({prefecture})</span>
            </h3>
            <p id="school-count">
              {lastCount} 年{isContinual ? '連続' : 'ぶり'} {totalCount} 回目
            </p>
            <span id="close" onClick={onCloseCard}>
              <i className="fa fa-close" />
            </span>
          </div>
          <table id="card-content">
            <tbody>{this.renderGames()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
