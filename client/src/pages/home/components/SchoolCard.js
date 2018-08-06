import React, {Component} from 'react';
import './SchoolCard.css';

export default class SchoolCard extends Component {

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
        </div>
      </div>
    )
  }
}
