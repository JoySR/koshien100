import React, {Component} from 'react';
import cx from 'classnames';
import './TimeTable.css';
import {fetchDates, setCurrentDate} from '../../../actions/dateAction'
import {timestampToDate, timestampTpWeekDay} from '../../../lib/converter'

export default class TimeTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: this.getTodaysDate().split('-').join(''),
    }
  }

  componentDidMount() {
    const {dispatch} = this.props
    this.props.onAsync(fetchDates());
    dispatch(setCurrentDate(this.state.currentDate));
  }

  getTodaysDate = () => {
    const timestamp = new Date().getTime();
    return timestampToDate(timestamp);
  }

  setDate = (date_id) => {
    const {dispatch} = this.props

    this.setState({
      currentDate: date_id,
    });

   dispatch(setCurrentDate(date_id));
  }

  renderTimeTable = () => {
    const {dates = []} = this.props;
    const {currentDate} = this.state;

    return dates.map(day => {
      return (
        <li className={cx(day.status, {
          active: +day.date_id === +currentDate,
        })} key={day.id} onClick={() => this.setDate(day.date_id)}>
          <span className="date">{timestampToDate(day.game_date).slice(-2)}</span>
          <span className="day">{timestampTpWeekDay(day.game_date)}</span>
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
