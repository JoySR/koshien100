import React, {Component} from 'react';
import {addPrefecture, fetchPrefecture, removePrefecture, updatePrefecture} from '../../../actions/prefectureAction'
import {fetchArea} from '../../../actions/areaAction'

export default class PrefectureBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prefectureId: '',
      areaId: '',
      prefectureName: '',
      prefectureCode: ''
    }
  }
  componentDidMount() {
    const {onAsync} = this.props
    onAsync(fetchPrefecture())
    onAsync(fetchArea()).then(() => {
      const {areas = []} = this.props;
      this.setState({
        areaId: areas.length > 0 ? areas[0].id : '',
      });
    })
  }

  onChange = (item, event) => {
    this.setState({
      [item]: event.target.value
    })
  }

  onSubmit = () => {
    const {id, prefectureId, areaId, prefectureName, prefectureCode, isEditing} = this.state;
    const {onAsync, areas} = this.props;
    const func = isEditing ? updatePrefecture({
      prefecture: {
        id,
        prefecture_id: prefectureId,
        name: prefectureName,
        area_id: areaId,
        code: prefectureCode,
      }
    }) : addPrefecture({
      prefecture: {
        prefecture_id: prefectureId,
        name: prefectureName,
        area_id: areaId,
        code: prefectureCode,
      }
    })
    onAsync(func).then(() => {
      this.setState({
        prefectureId: '',
        areaId: areas.length ? areas[0].id : '',
        prefectureName: '',
        prefectureCode: '',
        isEditing: false,
      });
      onAsync(fetchPrefecture())
    })
  }

  onEdit = (prefecture) => {
    const {id, prefecture_id, area_id, name, code} = prefecture;
    this.setState({
      isEditing: true,
      id,
      prefectureId: prefecture_id,
      areaId: area_id,
      prefectureName: name,
      prefectureCode: code
    });
  }

  onDelete = (id) => {
    const {onAsync} = this.props;
    onAsync(removePrefecture({
      prefecture: {
        id
      }
    })).then(() => {
      onAsync(fetchPrefecture())
    })
  }

  renderPrefectures = () => {
    const {prefectures = [], areas = []} = this.props;

    return prefectures.map(prefecture => {
      const {id, prefecture_id, area_id, name, code} = prefecture;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{prefecture_id}</td>
          <td>{name}</td>
          <td>{areas.length && areas.filter(area => {return area.area_id === area_id})[0].name}</td>
          <td>{code}</td>
          <td>
            <span onClick={() => this.onEdit(prefecture)}>Edit</span>
            <span onClick={() => this.onDelete(id)}>Delete</span>
          </td>
        </tr>
      )
    })
  }

  render() {
    const {prefectureId, areaId, prefectureName, prefectureCode, isEditing} = this.state;
    const {areas = []} = this.props;
    return (
      <main role="main" className="PrefectureBoard col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2>Prefectures</h2>
        <div className="Add-Prefecture">
          <h3>{isEditing ? 'Edit Prefecture' : 'Add Prefecture'}</h3>
          <ul>
            <li>
              <label>Prefecture Id: </label>
              <input value={prefectureId} onChange={(event) => this.onChange('prefectureId', event)} />
            </li>
            <li>
              <label>Prefecture Name: </label>
              <input value={prefectureName} onChange={(event) => this.onChange('prefectureName', event)} />
            </li>
            <li>
              <label>Area Name: </label>
              <select value={areaId} onChange={(event) => this.onChange('areaId', event)}>
                {areas.map(area => {
                  return (
                    <option value={area.area_id} key={area.id}>{area.name}</option>
                  )
                })}
              </select>
            </li>
            <li>
              <label>Prefecture Code: </label>
              <input value={prefectureCode} onChange={(event) => this.onChange('prefectureCode', event)} />
            </li>
          </ul>
          <button onClick={() => this.onSubmit('prefecture')}>OK</button>
        </div>
        <div className="Prefecture-List">
          <h3>Prefecture List</h3>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
              <tr>
                <th>ID</th>
                <th>Prefecture Id</th>
                <th>Prefecture Name</th>
                <th>Area Name</th>
                <th>Prefecture Code</th>
                <th>Options</th>
              </tr>
              </thead>
              <tbody>
              {this.renderPrefectures()}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
  }
}
