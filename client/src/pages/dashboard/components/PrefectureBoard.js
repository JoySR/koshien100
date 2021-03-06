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
  addPrefecture,
  fetchPrefecture,
  removePrefecture,
  updatePrefecture,
} from '../../../actions/prefectureAction';
import {fetchArea} from '../../../actions/areaAction';

export default class PrefectureBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prefectureId: '',
      areaId: '',
      prefectureName: '',
      prefectureCode: '',
      shouldShowModal: false,
    };
  }
  componentDidMount() {
    const {onAsync} = this.props;
    onAsync(fetchPrefecture());
    onAsync(fetchArea()).then(() => {
      const {areas = []} = this.props;
      this.setState({
        areaId: areas.length > 0 ? areas[0].id : '',
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
      prefectureId,
      areaId,
      prefectureName,
      prefectureCode,
      isEditing,
    } = this.state;
    const {onAsync} = this.props;
    const prefecture = {
      prefecture_id: prefectureId,
      name: prefectureName,
      area_id: areaId,
      code: prefectureCode,
    };
    const func = isEditing
      ? updatePrefecture({prefecture: {id, ...prefecture}})
      : addPrefecture({prefecture});
    onAsync(func).then(() => {
      this.clearState();
      onAsync(fetchPrefecture());
    });
  };

  onEdit = prefecture => {
    const {id, prefectureId, areaId, name, code} = prefecture;
    this.setState({
      shouldShowModal: true,
      isEditing: true,
      id,
      prefectureId,
      areaId,
      prefectureName: name,
      prefectureCode: code,
    });
  };

  onDelete = id => {
    const {onAsync} = this.props;
    onAsync(
      removePrefecture({
        prefecture: {
          id,
        },
      })
    ).then(() => {
      onAsync(fetchPrefecture());
    });
  };

  clearState = () => {
    const {areas} = this.props;
    this.setState({
      prefectureId: '',
      areaId: areas.length ? areas[0].id : '',
      prefectureName: '',
      prefectureCode: '',
      isEditing: false,
      shouldShowModal: false,
    });
  };

  renderPrefectures = () => {
    const {prefectures = [], areas = []} = this.props;

    return prefectures.map(prefecture => {
      const {id, prefectureId, areaId, name, code} = prefecture;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{prefectureId}</td>
          <td>{name}</td>
          <td>
            {areas.length &&
              areas.filter(area => {
                return area.areaId === areaId;
              })[0].name}
          </td>
          <td>{code}</td>
          <td className="options">
            <span onClick={() => this.onEdit(prefecture)}>
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
      prefectureId,
      areaId,
      prefectureName,
      prefectureCode,
      shouldShowModal,
      isEditing,
    } = this.state;
    const {areas = []} = this.props;
    return (
      <main
        role="main"
        className="Dashboard PrefectureBoard col-md-9 ml-sm-auto col-lg-10 px-4"
      >
        <h2>
          Prefectures
          <Button
            color="primary"
            size="sm"
            onClick={() => {
              this.setState({shouldShowModal: true});
            }}
          >
            Add Prefecture
          </Button>
        </h2>
        <div className="Prefecture-List">
          <Table className="table table-striped table-sm" responsive={true}>
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
            <tbody>{this.renderPrefectures()}</tbody>
          </Table>
        </div>
        <Modal
          className="Dashboard-Modal PrefectureBoard-Modal"
          isOpen={shouldShowModal}
          autoFocus={true}
          centered={true}
        >
          <ModalHeader>
            {isEditing ? 'Edit Prefecture' : 'Add Prefecture'}
          </ModalHeader>
          <ModalBody>
            <ul>
              <li>
                <label>Prefecture Id: </label>
                <input
                  value={prefectureId}
                  onChange={event => this.onChange('prefectureId', event)}
                />
              </li>
              <li>
                <label>Prefecture Name: </label>
                <input
                  value={prefectureName}
                  onChange={event => this.onChange('prefectureName', event)}
                />
              </li>
              <li>
                <label>Area Name: </label>
                <select
                  value={areaId}
                  onChange={event => this.onChange('areaId', event)}
                >
                  {areas.map(area => {
                    return (
                      <option value={area.areaId} key={area.id}>
                        {area.name}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <label>Prefecture Code: </label>
                <input
                  value={prefectureCode}
                  onChange={event => this.onChange('prefectureCode', event)}
                />
              </li>
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.onSubmit('prefecture')}>
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
