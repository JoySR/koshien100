import React, {Component} from 'react';
import {
  addArea,
  fetchArea,
  removeArea,
  updateArea,
} from '../../../actions/areaAction';

export default class AreaBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      areaId: '',
      areaName: '',
      areaCode: '',
    };
  }
  componentDidMount() {
    this.props.onAsync(fetchArea());
  }

  onChange = (item, event) => {
    this.setState({
      [item]: event.target.value,
    });
  };

  onSubmit = () => {
    const {id, areaId, areaName, areaCode, isEditing} = this.state;
    const {onAsync} = this.props;
    const func = isEditing
      ? updateArea({
          area: {
            id,
            area_id: areaId,
            name: areaName,
            code: areaCode,
          },
        })
      : addArea({
          area: {
            area_id: areaId,
            name: areaName,
            code: areaCode,
          },
        });
    onAsync(func).then(() => {
      this.setState({
        areaId: '',
        areaName: '',
        areaCode: '',
        isEditing: false,
      });
      onAsync(fetchArea());
    });
  };

  onEdit = area => {
    const {id, area_id, name, code} = area;
    this.setState({
      isEditing: true,
      id,
      areaId: area_id,
      areaName: name,
      areaCode: code,
    });
  };

  onDelete = id => {
    const {onAsync} = this.props;
    onAsync(
      removeArea({
        area: {
          id,
        },
      })
    ).then(() => {
      onAsync(fetchArea());
    });
  };

  renderAreas = () => {
    const {areas = []} = this.props;

    return areas.map(area => {
      const {id, area_id, name, code} = area;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{area_id}</td>
          <td>{name}</td>
          <td>{code}</td>
          <td>
            <span onClick={() => this.onEdit(area)}>Edit</span>
            <span onClick={() => this.onDelete(id)}>Delete</span>
          </td>
        </tr>
      );
    });
  };

  render() {
    const {areaId, areaName, areaCode, isEditing} = this.state;

    return (
      <main
        role="main"
        className="AreaBoard col-md-9 ml-sm-auto col-lg-10 px-4"
      >
        <h2>Areas</h2>
        <div className="Add-Area">
          <h3>{isEditing ? 'Edit Area' : 'Add Area'}</h3>
          <ul>
            <li>
              <label>Area Id: </label>
              <input
                value={areaId}
                onChange={event => this.onChange('areaId', event)}
              />
            </li>
            <li>
              <label>Area Name: </label>
              <input
                value={areaName}
                onChange={event => this.onChange('areaName', event)}
              />
            </li>
            <li>
              <label>Area Code: </label>
              <input
                value={areaCode}
                onChange={event => this.onChange('areaCode', event)}
              />
            </li>
          </ul>
          <button onClick={() => this.onSubmit('area')}>OK</button>
        </div>
        <div className="Area-List">
          <h3>Area List</h3>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Area Id</th>
                  <th>Area Name</th>
                  <th>Area Code</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>{this.renderAreas()}</tbody>
            </table>
          </div>
        </div>
      </main>
    );
  }
}
