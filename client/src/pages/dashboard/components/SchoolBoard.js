import React, {Component} from 'react';
import {addSchool, fetchSchools, removeSchool, updateSchool} from '../../../actions/schoolAction'
import {fetchPrefecture} from '../../../actions/prefectureAction'
import {decodeGameIds, encodeGameIds} from '../../../lib/converter'

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
      best: 0,
      games: [],
    }
  }
  componentDidMount() {
    const {onAsync} = this.props;
    onAsync(fetchSchools())
    onAsync(fetchPrefecture()).then(() => {
      const {prefectures = []} = this.props;
      this.setState({
        prefectureId: prefectures.length > 0 ? prefectures[0].id : '',
      });
    })
  }

  onChange = (item, event) => {
    this.setState({
      [item]: event.target.value
    })
  }

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
      best,
      games,
      isEditing
    } = this.state;
    const {onAsync} = this.props;
    const func = isEditing ? updateSchool({
      school: {
        id,
        school_id: schoolId,
        prefecture_id: prefectureId,
        name: name,
        short_name: shortName,
        is_continual: isContinual,
        last_count: lastCount,
        total_count: totalCount,
        win_count: winCount,
        lose_count: loseCount,
        best_result: best,
        games: encodeGameIds(games),
      }
    }) : addSchool({
      school: {
        school_id: schoolId,
        prefecture_id: prefectureId,
        name: name,
        short_name: shortName,
        is_continual: isContinual,
        last_count: lastCount,
        total_count: totalCount,
        win_count: winCount,
        lose_count: loseCount,
        best_result: best,
        games: encodeGameIds(games),
      }
    })
    onAsync(func).then(() => {
      this.setState({
        schoolId: '',
        prefectureId: '',
        name: '',
        shortName: '',
        isContinual: 0,
        lastCount: 0,
        totalCount: 0,
        winCount: 0,
        loseCount: 0,
        best: 0,
        games: [],
        isEditing: false,
      });
      onAsync(fetchSchools())
    })
  }

  onEdit = (school) => {
    const {
      id,
      school_id,
      prefecture_id,
      name,
      short_name,
      is_continual,
      last_count,
      total_count,
      win_count,
      lose_count,
      best_result,
      games
    } = school;
    this.setState({
      isEditing: true,
      id,
      schoolId: school_id,
      prefectureId: prefecture_id,
      name,
      shortName: short_name,
      isContinual: is_continual,
      lastCount: last_count,
      totalCount: total_count,
      winCount: win_count,
      loseCount: lose_count,
      best: best_result,
      games,
    });
  }

  onDelete = (id) => {
    const {onAsync} = this.props;
    onAsync(removeSchool({
      school: {
        id
      }
    })).then(() => {
      onAsync(fetchSchools())
    })
  }

  renderSchools = () => {
    const {schools = [], prefectures = []} = this.props;

    return schools.map(school => {
      const {
        id,
        school_id,
        prefecture_id,
        name,
        short_name,
        is_continual,
        last_count,
        total_count,
        win_count,
        lose_count,
        best_result,
        games
      } = school;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{school_id}</td>
          <td>{prefectures.filter(prefecture => {return prefecture.id === prefecture_id}).length ? prefectures.filter(prefecture => {return prefecture.id === prefecture_id})[0].name : ''}</td>
          <td>{name}</td>
          <td>{short_name}</td>
          <td>{is_continual}</td>
          <td>{last_count}</td>
          <td>{total_count}</td>
          <td>{win_count}</td>
          <td>{lose_count}</td>
          <td>{best_result}</td>
          <td>{decodeGameIds(games)}</td>
          <td>
            <span onClick={() => this.onEdit(school)}>Edit</span>
            <span onClick={() => this.onDelete(id)}>Delete</span>
          </td>
        </tr>
      )
    })
  }

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
      best,
      games,
      isEditing
    } = this.state;

    const {prefectures = []} = this.props;

    return (
      <main role="main" className="SchoolBoard col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2>Schools</h2>
        <div className="Add-School">
          <h3>{isEditing ? 'Edit School' : 'Add School'}</h3>
          <ul>
            <li>
              <label>School Id: </label>
              <input value={schoolId} onChange={(event) => this.onChange('schoolId', event)} />
            </li>
            <li>
              <label>Prefecture Name: </label>
              <select value={prefectureId} onChange={(event) => this.onChange('prefectureId', event)}>
                {prefectures.map(prefecture => {
                  return (
                    <option value={prefecture.id} key={prefecture.id}>{prefecture.name}</option>
                  )
                })}
              </select>
            </li>
            <li>
              <label>School Name: </label>
              <input value={name} onChange={(event) => this.onChange('name', event)} />
            </li>
            <li>
              <label>Short Name: </label>
              <input value={shortName} onChange={(event) => this.onChange('shortName', event)} />
            </li>
            <li>
              <label>Is Continual: </label>
              <select value={isContinual} onChange={(event) => this.onChange('isContinual', event)}>
                <option value={1}>Continual</option>
                <option value={0}>Not Continual</option>
              </select>
            </li>
            <li>
              <label>Last Count: </label>
              <input value={lastCount} onChange={(event) => this.onChange('lastCount', event)} />
            </li>
            <li>
              <label>Total Count: </label>
              <input value={totalCount} onChange={(event) => this.onChange('totalCount', event)} />
            </li>
            <li>
              <label>Win Count: </label>
              <input value={winCount} onChange={(event) => this.onChange('winCount', event)} />
            </li>
            <li>
              <label>Lose Count: </label>
              <input value={loseCount} onChange={(event) => this.onChange('loseCount', event)} />
            </li>
            <li>
              <label>Best Result: </label>
              <input value={best} onChange={(event) => this.onChange('best', event)} />
            </li>
            <li>
              <label>Games: </label>
              <input value={games} onChange={(event) => this.onChange('games', event)} />
            </li>
          </ul>
          <button onClick={() => this.onSubmit('school')}>OK</button>
        </div>
        <div className="School-List">
          <h3>School List</h3>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
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
                <th>Games</th>
                <th>Options</th>
              </tr>
              </thead>
              <tbody>
              {this.renderSchools()}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
  }
}
