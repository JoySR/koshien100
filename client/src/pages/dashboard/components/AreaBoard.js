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
      this.clearState();
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

  clearState = () => {
    this.setState({
      areaId: '',
      areaName: '',
      areaCode: '',
      isEditing: false,
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
        <div className="Area-List">
          <Table className="table table-striped table-sm" responsive={true}>
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
          </Table>
          <Modal
            className="Dashboard-Modal AreaBoard-Modal"
            isOpen={areaId !== ''}
            autoFocus={true}
            centered={true}
          >
            <ModalHeader>{isEditing ? 'Edit Area' : 'Add Area'}</ModalHeader>
            <ModalBody>
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
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.onSubmit('area')}>
                Submit
              </Button>
              <Button outline onClick={this.clearState}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </main>
    );
  }
}
