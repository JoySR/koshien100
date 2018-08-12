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
      const {first_id, first_scores, third_scores} = game;
      const firstFinalScore = scoresToTotalScore(first_scores);
      const thirdFinalScore = scoresToTotalScore(third_scores);

      if (schoolId === first_id) {
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
      const {date_id} = game;
      const date = dateIdToMonthDay(date_id, '-');

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
            const {school_id, prefecture_id} = school;
            const prefecture = dataIdToDataValue({
              id: prefecture_id,
              dataList: prefectures,
              fromKey: 'prefecture_id',
            });
            const prefectureCode = dataIdToDataValue({
              id: prefecture_id,
              dataList: prefectures,
              fromKey: 'prefecture_id',
              toKey: 'code',
            });

            return (
              <div
                key={school_id}
                className={cx('prefecture-block', `${prefectureCode}`, {
                  today: this.isSchoolToday(school_id),
                  haitai: this.isSchoolHaitai(school_id),
                })}
                onClick={() => {
                  onShowSchool(school_id);
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
