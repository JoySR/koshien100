import React, {Component} from 'react';
import cx from 'classnames';
import {
  dataIdToDataValue,
  dateIdToMonthDay,
  schoolInGamesToGamesInSchool,
  scoresToTotalScore,
  timestampToDate,
} from '../../../lib/converter';

import './Map.css';

export default class Map extends Component {
  isSchoolHaitai = schoolId => {
    const {games = []} = this.props;
    const gamesOfSchool = schoolInGamesToGamesInSchool(schoolId, games);

    return gamesOfSchool.some(game => {
      const {firstId, firstScores, thirdScores} = game;
      const firstFinalScore = scoresToTotalScore(firstScores);
      const thirdFinalScore = scoresToTotalScore(thirdScores);

      if (schoolId === firstId) {
        return firstFinalScore < thirdFinalScore;
      }
      return firstFinalScore > thirdFinalScore;
    });
  };

  isSchoolToday = schoolId => {
    const today = timestampToDate().slice(5);
    const {games = []} = this.props;
    const gamesOfSchool = schoolInGamesToGamesInSchool(schoolId, games);

    return gamesOfSchool.some(game => {
      const {dateId} = game;
      const date = dateIdToMonthDay(dateId, '-');

      return date === today;
    });
  };

  render() {
    const {schools = [], prefectures = [], onShowSchool} = this.props;

    return schools.length ? (
      <div className="map-wrapper">
        <div className="map">
          <div className="prefecture-block notes today">今日試合</div>
          <div className="prefecture-block notes haitai">敗退</div>
          <div className="prefecture-block notes yusho">優勝</div>
          {schools.map(school => {
            const {schoolId, prefectureId} = school;
            const prefecture = dataIdToDataValue({
              id: prefectureId,
              dataList: prefectures,
              fromKey: 'prefectureId',
            });
            const prefectureCode = dataIdToDataValue({
              id: prefectureId,
              dataList: prefectures,
              fromKey: 'prefectureId',
              toKey: 'code',
            });

            return (
              <div
                key={schoolId}
                className={cx('prefecture-block', `${prefectureCode}`, {
                  today: this.isSchoolToday(schoolId),
                  haitai: this.isSchoolHaitai(schoolId),
                })}
                onClick={() => {
                  onShowSchool(schoolId);
                }}
              >
                <div className="prefecture">{prefecture}</div>
              </div>
            );
          })}
        </div>
      </div>
    ) : null;
  }
}
