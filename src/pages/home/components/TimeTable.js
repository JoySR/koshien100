import React, {Component} from 'react';
import './TimeTable.css';

const MATCH_DAYS = [
  {
    date: '05',
    weekday: '日',
  },
  {
    date: '06',
    weekday: '月',
  },
  {
    date: '07',
    weekday: '火',
  },
  {
    date: '08',
    weekday: '水',
  },
  {
    date: '09',
    weekday: '木',
  },
  {
    date: '10',
    weekday: '金',
  },
  {
    date: '11',
    weekday: '土',
  },
  {
    date: '12',
    weekday: '日',
  },
  {
    date: '13',
    weekday: '月',
  },
  {
    date: '14',
    weekday: '火',
  },
  {
    date: '15',
    weekday: '水',
  },
  {
    date: '16',
    weekday: '木',
  },
  {
    date: '17',
    weekday: '金',
  },
  {
    date: '18',
    weekday: '土',
  },
  {
    date: '19',
    weekday: '日',
  },
  {
    date: '20',
    weekday: '月',
  }
];

export default class TimeTable extends Component {
  renderTimeTable = () => {
    return MATCH_DAYS.map(day => {
      return (
        <li key={day.date}>
          <span className="date">{day.date}</span>
          <span className="day">{day.weekday}</span>
        </li>
      )
    })

  }
  render() {
    return (
      <ul className="time-table">
        {this.renderTimeTable()}
      </ul>
    );
  }
}
