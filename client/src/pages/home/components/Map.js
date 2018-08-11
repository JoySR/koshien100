import React, {Component} from 'react';
import cx from 'classnames';
import {dataIdToDataValue} from '../../../lib/converter'

import './Map.css'

export default class Map extends Component {
  render() {
    const {schools = [], prefectures = [], onShowSchool} = this.props;

    return (
      <div className="map-wrapper">
        <div className="map">
          {schools.map(school => {
            const {school_id, prefecture_id} = school;
            const prefecture = dataIdToDataValue({id: prefecture_id, dataList: prefectures, fromKey: 'prefecture_id'})
            const prefectureCode = dataIdToDataValue({id: prefecture_id, dataList: prefectures, fromKey: 'prefecture_id', toKey: 'code'})
            return (
              <div key={school_id} className={cx('prefecture-block', `${prefectureCode}`)} onClick={() => {onShowSchool(school_id)}}>
                <div className="prefecture">
                  {prefecture}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}
