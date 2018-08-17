import React, {Component} from 'react';
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {
  addDate,
  fetchDates,
  removeDate,
  updateDate,
} from '../../../actions/dateAction';
import {
  dateToDateId,
  dateToTimestamp,
  timestampToDate,
} from '../../../lib/converter';

const DATE_STATUS = ['normal', 'bracket_selection', 'rest', 'postponed'];

export default class DateBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameDate: '',
      dateStatus: DATE_STATUS[0],
      shouldShowModal: false,
    };
  }
  componentDidMount() {
    this.props.onAsync(fetchDates());
  }

  onChange = (item, event) => {
    this.setState({
      [item]: event.target.value,
    });
  };

  onSubmit = () => {
    const {id, gameDate, dateStatus, isEditing} = this.state;
    const date = {
      date_id: dateToDateId(gameDate),
      game_date: dateToTimestamp(gameDate),
      status: dateStatus,
    };
    const {onAsync} = this.props;
    const func = isEditing
      ? updateDate({date: {id, ...date}})
      : addDate({date});
    onAsync(func).then(() => {
      this.clearState();
      onAsync(fetchDates());
    });
  };

  onEdit = date => {
    const {id, gameDate, status} = date;
    this.setState({
      shouldShowModal: true,
      isEditing: true,
      id,
      gameDate: timestampToDate(gameDate),
      dateStatus: status,
    });
  };

  onDelete = id => {
    const {onAsync} = this.props;
    onAsync(
      removeDate({
        date: {
          id,
        },
      })
    ).then(() => {
      onAsync(fetchDates());
    });
  };

  clearState = () => {
    this.setState({
      gameDate: '',
      dateStatus: DATE_STATUS[0],
      isEditing: false,
      shouldShowModal: false,
    });
  };

  renderDates = () => {
    const {dates = []} = this.props;

    return dates.map(date => {
      const {id, dateId, gameDate, status} = date;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{dateId}</td>
          <td>{timestampToDate(gameDate)}</td>
          <td>{status}</td>
          <td className="options">
            <span onClick={() => this.onEdit(date)}>
              <i className="fa fa-pencil-square-o" />
            </span>
            <span onClick={() => this.onDelete(id)}>
              <i className="fa fa-trash-o" />
            </span>
          </td>
        </tr>
      );
    });
  };

  render() {
    const {gameDate, dateStatus, shouldShowModal, isEditing} = this.state;
    return (
      <main
        role="main"
        className="Dashboard DateBoard col-md-9 ml-sm-auto col-lg-10 px-4"
      >
        <h2>
          Dates
          <Button
            color="primary"
            size="sm"
            onClick={() => {
              this.setState({shouldShowModal: true});
            }}
          >
            Add Date
          </Button>
        </h2>
        <div className="Date-List">
          <Table className="table table-striped table-sm" responsive={true}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date Id</th>
                <th>Day</th>
                <th>Date Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>{this.renderDates()}</tbody>
          </Table>
        </div>
        <Modal
          className="Dashboard-Modal DateBoard-Modal"
          isOpen={shouldShowModal}
          autoFocus={true}
          centered={true}
        >
          <ModalHeader>{isEditing ? 'Edit Date' : 'Add Date'}</ModalHeader>
          <ModalBody>
            <ul>
              <li>
                <label>
                  <span style={{fontSize: 12, color: '#999', marginRight: 3}}>
                    ( Format: 2018-08-02 )
                  </span>
                  Date:
                </label>
                <input
                  value={gameDate}
                  onChange={event => this.onChange('gameDate', event)}
                />
              </li>
              <li>
                <label>Date Status: </label>
                <select
                  value={dateStatus}
                  onChange={event => this.onChange('dateStatus', event)}
                >
                  {DATE_STATUS.map(status => {
                    return (
                      <option value={status} key={status}>
                        {status}
                      </option>
                    );
                  })}
                </select>
              </li>
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.onSubmit('date')}>
              Submit
            </Button>
            <Button outline onClick={this.clearState}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </main>
    );
  }
}
