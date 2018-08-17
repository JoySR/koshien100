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
  addSchool,
  fetchSchools,
  removeSchool,
  updateSchool,
} from '../../../actions/schoolAction';
import {fetchPrefecture} from '../../../actions/prefectureAction';

export default class SchoolBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schoolId: '',
      prefectureId: '',
      name: '',
      shortName: '',
      isContinual: 0,
      lastCount: 0,
      totalCount: 0,
      winCount: 0,
      loseCount: 0,
      bestResult: 1,
      shouldShowModal: false,
    };
  }
  componentDidMount() {
    const {onAsync} = this.props;
    onAsync(fetchSchools());
    onAsync(fetchPrefecture()).then(() => {
      const {prefectures = []} = this.props;
      this.setState({
        prefectureId: prefectures.length > 0 ? prefectures[0].prefectureId : '',
      });
    });
  }

  onChange = (item, event) => {
    this.setState({
      [item]: event.target.value,
    });
  };

  onSubmit = () => {
    const {
      id,
      schoolId,
      prefectureId,
      name,
      shortName,
      isContinual,
      lastCount,
      totalCount,
      winCount,
      loseCount,
      bestResult,
      isEditing,
    } = this.state;
    const {onAsync} = this.props;
    const school = {
      school_id: schoolId,
      prefecture_id: prefectureId,
      name,
      short_name: shortName,
      is_continual: isContinual,
      last_count: lastCount,
      totalCount: totalCount,
      win_count: winCount,
      lose_count: loseCount,
      best_result: bestResult,
    };
    const func = isEditing
      ? updateSchool({school: {id, ...school}})
      : addSchool({school});
    onAsync(func).then(() => {
      this.clearState();
      onAsync(fetchSchools());
    });
  };

  onEdit = school => {
    const {
      id,
      schoolId,
      prefectureId,
      name,
      shortName,
      isContinual,
      lastCount,
      totalCount,
      winCount,
      loseCount,
      bestResult,
    } = school;
    this.setState({
      shouldShowModal: true,
      isEditing: true,
      id,
      schoolId,
      prefectureId,
      name,
      shortName,
      isContinual,
      lastCount,
      totalCount,
      winCount,
      loseCount,
      bestResult,
    });
  };

  onDelete = id => {
    const {onAsync} = this.props;
    onAsync(
      removeSchool({
        school: {
          id,
        },
      })
    ).then(() => {
      onAsync(fetchSchools());
    });
  };

  clearState = () => {
    const {prefectures} = this.props;
    this.setState({
      schoolId: '',
      prefectureId: prefectures[0].prefectureId,
      name: '',
      shortName: '',
      isContinual: 0,
      lastCount: 0,
      totalCount: 0,
      winCount: 0,
      loseCount: 0,
      bestResult: 1,
      isEditing: false,
      shouldShowModal: false,
    });
  };

  renderSchools = () => {
    const {schools = [], prefectures = []} = this.props;

    return schools.map(school => {
      const {
        id,
        schoolId,
        prefectureId,
        name,
        shortName,
        isContinual,
        lastCount,
        totalCount,
        winCount,
        loseCount,
        bestResult,
      } = school;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{schoolId}</td>
          <td>
            {prefectures.filter(prefecture => {
              return prefecture.prefectureId === prefectureId;
            }).length
              ? prefectures.filter(prefecture => {
                  return prefecture.prefectureId === prefectureId;
                })[0].name
              : ''}
          </td>
          <td>{name}</td>
          <td>{shortName}</td>
          <td>{isContinual}</td>
          <td>{lastCount}</td>
          <td>{totalCount}</td>
          <td>{winCount}</td>
          <td>{loseCount}</td>
          <td>{bestResult}</td>
          <td className="options">
            <span onClick={() => this.onEdit(school)}>
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
    const {
      schoolId,
      prefectureId,
      name,
      shortName,
      isContinual,
      lastCount,
      totalCount,
      winCount,
      loseCount,
      bestResult,
      shouldShowModal,
      isEditing,
    } = this.state;

    const {prefectures = []} = this.props;

    return (
      <main
        role="main"
        className="Dashboard SchoolBoard col-md-9 ml-sm-auto col-lg-10 px-4"
      >
        <h2>
          Schools
          <Button
            color="primary"
            size="sm"
            onClick={() => {
              this.setState({shouldShowModal: true});
            }}
          >
            Add School
          </Button>
        </h2>
        <div className="School-List">
          <Table className="table table-striped table-sm" responsive={true}>
            <thead>
              <tr>
                <th>ID</th>
                <th>School Id</th>
                <th>Prefecture Name</th>
                <th>School Name</th>
                <th>Short Name</th>
                <th>Continual?</th>
                <th>Last Count</th>
                <th>Total Count</th>
                <th>Win Count</th>
                <th>Lose Count</th>
                <th>Best Result</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>{this.renderSchools()}</tbody>
          </Table>
        </div>
        <Modal
          className="Dashboard-Modal SchoolBoard-Modal"
          isOpen={shouldShowModal}
          autoFocus={true}
          centered={true}
        >
          <ModalHeader>{isEditing ? 'Edit School' : 'Add School'}</ModalHeader>
          <ModalBody>
            <ul>
              <li>
                <label>School Id: </label>
                <input
                  value={schoolId}
                  onChange={event => this.onChange('schoolId', event)}
                />
              </li>
              <li>
                <label>Prefecture Name: </label>
                <select
                  value={prefectureId}
                  onChange={event => this.onChange('prefectureId', event)}
                >
                  {prefectures.map(prefecture => {
                    return (
                      <option
                        value={prefecture.prefectureId}
                        key={prefecture.id}
                      >
                        {prefecture.name}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <label>School Name: </label>
                <input
                  value={name}
                  onChange={event => this.onChange('name', event)}
                />
              </li>
              <li>
                <label>Short Name: </label>
                <input
                  value={shortName}
                  onChange={event => this.onChange('shortName', event)}
                />
              </li>
              <li>
                <label>Is Continual: </label>
                <select
                  value={isContinual}
                  onChange={event => this.onChange('isContinual', event)}
                >
                  <option value={1}>Continual</option>
                  <option value={0}>Not Continual</option>
                </select>
              </li>
              <li>
                <label>Last Count: </label>
                <input
                  value={lastCount}
                  onChange={event => this.onChange('lastCount', event)}
                />
              </li>
              <li>
                <label>Total Count: </label>
                <input
                  value={totalCount}
                  onChange={event => this.onChange('totalCount', event)}
                />
              </li>
              <li>
                <label>Win Count: </label>
                <input
                  value={winCount}
                  onChange={event => this.onChange('winCount', event)}
                />
              </li>
              <li>
                <label>Lose Count: </label>
                <input
                  value={loseCount}
                  onChange={event => this.onChange('loseCount', event)}
                />
              </li>
              <li>
                <label>Best Result: </label>
                <select
                  value={bestResult}
                  onChange={event => this.onChange('bestResult', event)}
                >
                  <option value={1}>一回戦</option>
                  <option value={2}>二回戦</option>
                  <option value={3}>三回戦</option>
                  <option value={4}>準々決勝</option>
                  <option value={5}>準決勝</option>
                  <option value={6}>決勝</option>
                </select>
              </li>
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.onSubmit('school')}>
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
