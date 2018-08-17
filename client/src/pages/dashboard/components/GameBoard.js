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
  addGame,
  fetchGames,
  removeGame,
  updateGame,
} from '../../../actions/gameAction';
import {fetchDates} from '../../../actions/dateAction';
import {fetchSchools} from '../../../actions/schoolAction';
import {
  scoresToTotalScore,
  timestampToDate,
  gameIdToDateId,
} from '../../../lib/converter';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: '',
      dateId: '',
      round: '',
      time: '',
      isFirstHome: 0,
      firstId: 0,
      thirdId: 0,
      firstScores: '',
      thirdScores: '',
      videoId: '',
      shouldShowModal: false,
    };
  }
  componentDidMount() {
    const {onAsync} = this.props;
    onAsync(fetchGames());
    onAsync(fetchSchools());
    onAsync(fetchDates());
  }

  onChange = (item, event) => {
    this.setState({
      [item]: event.target.value,
    });
  };

  onSubmit = () => {
    const {
      id,
      gameId,
      dateId,
      round,
      time,
      isFirstHome,
      firstId,
      thirdId,
      firstScores,
      thirdScores,
      videoId,
      isEditing,
    } = this.state;
    const game = {
      game_id: gameId,
      date_id: gameIdToDateId(gameId),
      round,
      time,
      is_first_home: isFirstHome,
      first_id: firstId,
      third_id: thirdId,
      first_scores: firstScores,
      third_scores: thirdScores,
      video_id: videoId,
    };
    const {onAsync} = this.props;
    const func = isEditing
      ? updateGame({game: {id, ...game}})
      : addGame({game});
    onAsync(func).then(() => {
      this.clearState();
      onAsync(fetchGames());
    });
  };

  onEdit = game => {
    const {
      id,
      gameId,
      dateId,
      round,
      time,
      isFirstHome,
      firstId,
      thirdId,
      firstScores,
      thirdScores,
      videoId,
    } = game;
    this.setState({
      shouldShowModal: true,
      isEditing: true,
      id,
      gameId,
      dateId,
      round,
      time: time,
      isFirstHome,
      firstId,
      thirdId,
      firstScores,
      thirdScores,
      videoId,
    });
  };

  onDelete = id => {
    const {onAsync} = this.props;
    onAsync(
      removeGame({
        game: {
          id,
        },
      })
    ).then(() => {
      onAsync(fetchGames());
    });
  };

  clearState = () => {
    this.setState({
      gameId: '',
      dateId: '',
      round: '',
      time: '',
      isFirstHome: 0,
      firstId: 0,
      thirdId: 0,
      firstScores: '',
      thirdScores: '',
      isEditing: false,
      videoId: '',
      shouldShowModal: false,
    });
  };

  renderGames = () => {
    const {games = [], dates = [], schools = []} = this.props;

    return games.map(game => {
      const {
        id,
        gameId,
        dateId,
        round,
        time,
        firstId,
        thirdId,
        firstScores,
        thirdScores,
        videoId,
      } = game;
      return (
        <tr key={id}>
          <td>{gameId}</td>
          <td>
            {dates.filter(date => {
              return date.dateId === dateId;
            }).length
              ? timestampToDate(
                  dates.filter(date => {
                    return date.dateId === dateId;
                  })[0].gameDate
                )
              : ''}
          </td>
          <td>{round}</td>
          <td>{time}</td>
          <td>
            {schools.filter(school => {
              return school.schoolId === firstId;
            }).length
              ? schools.filter(school => {
                  return school.schoolId === firstId;
                })[0].name
              : ''}
          </td>
          <td>{scoresToTotalScore(firstScores)}</td>
          <td>{scoresToTotalScore(thirdScores)}</td>
          <td>
            {schools.filter(school => {
              return school.schoolId === thirdId;
            }).length
              ? schools.filter(school => {
                  return school.schoolId === thirdId;
                })[0].name
              : ''}
          </td>
          <td>{videoId.slice(0, 7)}</td>
          <td className="options">
            <span onClick={() => this.onEdit(game)}>
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
      gameId,
      round,
      time,
      isFirstHome,
      firstId,
      thirdId,
      firstScores,
      thirdScores,
      videoId,
      shouldShowModal,
      isEditing,
    } = this.state;

    return (
      <main
        role="main"
        className="Dashboard GameBoard col-md-9 ml-sm-auto col-lg-10 px-4"
      >
        <h2>
          Games
          <Button
            color="primary"
            size="sm"
            onClick={() => {
              this.setState({shouldShowModal: true});
            }}
          >
            Add Game
          </Button>
        </h2>
        <div className="Game-List">
          <Table className="table table-striped table-sm" responsive={true}>
            <thead>
              <tr>
                <th>Game Id</th>
                <th>Date</th>
                <th>Round</th>
                <th>Time</th>
                <th>First</th>
                <th>1.Score</th>
                <th>3.Score</th>
                <th>Third</th>
                <th>Video Id</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>{this.renderGames()}</tbody>
          </Table>
        </div>
        <Modal
          className="Dashboard-Modal GameBoard-Modal"
          isOpen={shouldShowModal}
          autoFocus={true}
          centered={true}
          size="lg"
        >
          <ModalHeader>{isEditing ? 'Edit Game' : 'Add Game'}</ModalHeader>
          <ModalBody>
            <ul>
              <li>
                <label>Game Id: </label>
                <input
                  value={gameId}
                  onChange={event => this.onChange('gameId', event)}
                />
              </li>
              <li>
                <label>Round: </label>
                <input
                  value={round}
                  onChange={event => this.onChange('round', event)}
                />
              </li>
              <li>
                <label>Time: </label>
                <input
                  value={time}
                  onChange={event => this.onChange('time', event)}
                />
              </li>
              <li>
                <label>Is First Home: </label>
                <select
                  value={isFirstHome}
                  onChange={event => this.onChange('isFirstHome', event)}
                >
                  <option value={0}>First is Visit</option>
                  <option value={1}>First is Home</option>
                </select>
              </li>
              <li>
                <label>First: </label>
                <input
                  value={firstId}
                  onChange={event => this.onChange('firstId', event)}
                />
              </li>
              <li>
                <label>Third: </label>
                <input
                  value={thirdId}
                  onChange={event => this.onChange('thirdId', event)}
                />
              </li>
              <li>
                <label>First Scores: </label>
                <input
                  style={{width: 400}}
                  value={firstScores}
                  onChange={event => this.onChange('firstScores', event)}
                />
              </li>
              <li>
                <label>Third Scores: </label>
                <input
                  style={{width: 400}}
                  value={thirdScores}
                  onChange={event => this.onChange('thirdScores', event)}
                />
              </li>
              <li>
                <label>Video Id: </label>
                <input
                  style={{width: 400}}
                  value={videoId}
                  onChange={event => this.onChange('videoId', event)}
                />
              </li>
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.onSubmit('game')}>
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
