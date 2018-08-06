import React, {Component} from 'react';
import {addDate, fetchDates, removeDate, updateDate} from '../../../actions/dateAction'
import {dateToDateId, dateToTimestamp, timestampToDate} from '../../../lib/converter'

const DATE_STATUS = ['normal', 'bracket_selection', 'rest', 'postponed']

export default class DateBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameDate: '',
      dateStatus: DATE_STATUS[0],
    }
  }
  componentDidMount() {
    this.props.onAsync(fetchDates())
  }

  onChange = (item, event) => {
    this.setState({
      [item]: event.target.value
    })
  }

  onSubmit = () => {
    const {id, gameDate, dateStatus, isEditing} = this.state;
    const {onAsync} = this.props;
    const func = isEditing ? updateDate({
      date: {
        id,
        date_id: dateToDateId(gameDate),
        game_date: dateToTimestamp(gameDate),
        status: dateStatus,
      }
    }) : addDate({
      date: {
        date_id: dateToDateId(gameDate),
        game_date: dateToTimestamp(gameDate),
        status: dateStatus,
      }
    })
    onAsync(func).then(() => {
      this.setState({
        gameDate: '',
        dateStatus: DATE_STATUS[0],
        isEditing: false,
      });
      onAsync(fetchDates())
    })
  }

  onEdit = (date) => {
    const {id, game_date, status} = date;
    this.setState({
      isEditing: true,
      id,
      gameDate: timestampToDate(game_date),
      dateStatus: status
    });
  }

  onDelete = (id) => {
    const {onAsync} = this.props;
    onAsync(removeDate({
      date: {
        id
      }
    })).then(() => {
      onAsync(fetchDates())
    })
  }

  renderDates = () => {
    const {dates = []} = this.props;

    return dates.map(date => {
      const {id, date_id, game_date, status} = date;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{date_id}</td>
          <td>{timestampToDate(game_date)}</td>
          <td>{status}</td>
          <td>
            <span onClick={() => this.onEdit(date)}>Edit</span>
            <span onClick={() => this.onDelete(id)}>Delete</span>
          </td>
        </tr>
      )
    })
  }

  render() {
    const {gameDate, dateStatus, isEditing} = this.state;
    return (
      <main role="main" className="DateBoard col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2>Dates</h2>
        <div className="Add-Date">
          <h3>{isEditing ? 'Edit Date' : 'Add Date'}</h3>
          <ul>
            <li>
              <label>Date: </label>
              <input value={gameDate} onChange={(event) => this.onChange('gameDate', event)} />
            </li>
            <li>
              <label>Date Status: </label>
              <select value={dateStatus} onChange={(event) => this.onChange('dateStatus', event)}>
                {DATE_STATUS.map(status => {
                  return (
                    <option value={status} key={status}>{status}</option>
                  )
                })}
              </select>
            </li>
          </ul>
          <button onClick={() => this.onSubmit('date')}>OK</button>
        </div>
        <div className="Date-List">
          <h3>Date List</h3>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
              <tr>
                <th>ID</th>
                <th>Date Id</th>
                <th>Day</th>
                <th>Date Status</th>
                <th>Options</th>
              </tr>
              </thead>
              <tbody>
              {this.renderDates()}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
  }
}
