import React, {Component} from 'react';
import cx from 'classnames';
import './TimeTable.css';
import {fetchDates, setCurrentDate} from '../../../actions/dateAction';
import {timestampToDate, timestampToWeekDay} from '../../../lib/converter';

export default class TimeTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: this.getTodaysDate()
        .split('-')
        .join(''),
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    this.props.onAsync(fetchDates());
    dispatch(setCurrentDate(this.state.currentDate));
  }

  getTodaysDate = () => {
    const timestamp = new Date().getTime();
    return timestampToDate(timestamp);
  };

  setDate = dateId => {
    const {dispatch} = this.props;

    this.setState({
      currentDate: dateId,
    });

    dispatch(setCurrentDate(dateId));
  };

  renderTimeTable = () => {
    const {dates = []} = this.props;
    const {currentDate} = this.state;

    return dates.map(day => {
      return (
        <li
          className={cx(day.status, {
            active: +day.dateId === +currentDate,
          })}
          key={day.id}
          onClick={() => this.setDate(day.dateId)}
        >
          <span className="date">
            {timestampToDate(day.gameDate).slice(-2)}
          </span>
          <span className="day">{timestampToWeekDay(day.gameDate)}</span>
        </li>
      );
    });
  };
  render() {
    return <ul className="time-table">{this.renderTimeTable()}</ul>;
  }
}
