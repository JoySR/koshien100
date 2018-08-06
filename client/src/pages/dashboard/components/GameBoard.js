import React, {Component} from 'react';
import {addGame, fetchGames, removeGame, updateGame} from '../../../actions/gameAction'
import {fetchDates} from '../../../actions/dateAction'
import {fetchSchools} from '../../../actions/schoolAction'
import {decodeScores, scoresToTotalScore, timestampToDate} from '../../../lib/converter'

export default class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: '',
      dateId: '',
      round: '',
      time: '',
      isFirstHome: 1,
      firstId: 0,
      thirdId: 0,
      firstScores: '',
      thirdScores: '',
    }
  }
  componentDidMount() {
    const {onAsync} = this.props;
    onAsync(fetchGames());
    onAsync(fetchSchools());
    onAsync(fetchDates()).then(() => {
      const {dates = []} = this.props;
      this.setState({
        dateId: dates.length > 0 ? dates[0].id : '',
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
      gameId,
      dateId,
      round,
      time,
      isFirstHome,
      firstId,
      thirdId,
      firstScores,
      thirdScores,
      isEditing
    } = this.state;
    const {onAsync} = this.props;
    const func = isEditing ? updateGame({
      game: {
        id,
        game_id: gameId,
        date_id: dateId,
        round: round,
        time: time,
        is_first_home: isFirstHome,
        first_id: firstId,
        third_id: thirdId,
        first_scores: firstScores,
        third_scores: thirdScores,
      }
    }) : addGame({
      game: {
        game_id: gameId,
        date_id: dateId,
        round: round,
        time: time,
        is_first_home: isFirstHome,
        first_id: firstId,
        third_id: thirdId,
        first_scores: firstScores,
        third_scores: thirdScores,
      }
    })
    onAsync(func).then(() => {
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
      });
      onAsync(fetchGames())
    })
  }

  onEdit = (game) => {
    const {
      id,
      game_id,
      date_id,
      round,
      time,
      is_first_home,
      first_id,
      third_id,
      first_scores,
      third_scores,
    } = game;
    this.setState({
      isEditing: true,
      id,
      gameId: game_id,
      dateId: date_id,
      round,
      time: time,
      isFirstHome: is_first_home,
      firstId: first_id,
      thirdId: third_id,
      firstScores: first_scores,
      thirdScores: third_scores,
    });
  }

  onDelete = (id) => {
    const {onAsync} = this.props;
    onAsync(removeGame({
      game: {
        id
      }
    })).then(() => {
      onAsync(fetchGames())
    })
  }

  renderGames = () => {
    const {games = [], dates = [], schools = []} = this.props;

    return games.map(game => {
      const {
        id,
        game_id,
        date_id,
        round,
        time,
        is_first_home,
        first_id,
        third_id,
        first_scores,
        third_scores,
      } = game;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{game_id}</td>
          <td>{dates.filter(date => {return date.id === date_id}).length ? timestampToDate(dates.filter(date => {return date.id === date_id})[0].game_date) : ''}</td>
          <td>{round}</td>
          <td>{time}</td>
          <td>{is_first_home}</td>
          <td>{schools.filter(school => {return school.school_id === first_id}).length ? schools.filter(school => {return school.school_id === first_id})[0].name : ''}</td>
          <td>{scoresToTotalScore(first_scores)}</td>
          <td>{scoresToTotalScore(third_scores)}</td>
          <td>{schools.filter(school => {return school.school_id === third_id}).length ? schools.filter(school => {return school.school_id === third_id})[0].name : ''}</td>
          <td>
            <span onClick={() => this.onEdit(game)}>Edit</span>
            <span onClick={() => this.onDelete(id)}>Delete</span>
          </td>
        </tr>
      )
    })
  }

  render() {
    const {
      gameId,
      dateId,
      round,
      time,
      isFirstHome,
      firstId,
      thirdId,
      firstScores,
      thirdScores,
      isEditing
    } = this.state;

    const {dates = []} = this.props;

    return (
      <main role="main" className="GameBoard col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2>Games</h2>
        <div className="Add-Game">
          <h3>{isEditing ? 'Edit Game' : 'Add Game'}</h3>
          <ul>
            <li>
              <label>Game Id: </label>
              <input value={gameId} onChange={(event) => this.onChange('gameId', event)} />
            </li>
            <li>
              <label>Date: </label>
              <select value={dateId} onChange={(event) => this.onChange('dateId', event)}>
                {dates.map(date => {
                  return (
                    <option value={date.id} key={date.id}>{timestampToDate(date.game_date)}</option>
                  )
                })}
              </select>
            </li>
            <li>
              <label>Round: </label>
              <input value={round} onChange={(event) => this.onChange('round', event)} />
            </li>
            <li>
              <label>Time: </label>
              <input value={time} onChange={(event) => this.onChange('time', event)} />
            </li>
            <li>
              <label>Is FirstHome: </label>
              <select value={isFirstHome} onChange={(event) => this.onChange('isFirstHome', event)}>
                <option value={1}>First is Home</option>
                <option value={0}>First is Visit</option>
              </select>
            </li>
            <li>
              <label>First: </label>
              <input value={firstId} onChange={(event) => this.onChange('firstId', event)} />
            </li>
            <li>
              <label>Third: </label>
              <input value={thirdId} onChange={(event) => this.onChange('thirdId', event)} />
            </li>
            <li>
              <label>First Scores: </label>
              <input style={{width: 400}} value={firstScores} onChange={(event) => this.onChange('firstScores', event)} />
            </li>
            <li>
              <label>Third Scores: </label>
              <input style={{width: 400}} value={thirdScores} onChange={(event) => this.onChange('thirdScores', event)} />
            </li>
          </ul>
          <button onClick={() => this.onSubmit('game')}>OK</button>
        </div>
        <div className="Game-List">
          <h3>Game List</h3>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
              <tr>
                <th>ID</th>
                <th>Game Id</th>
                <th>Date</th>
                <th>Round</th>
                <th>Time</th>
                <th>Is First Home</th>
                <th>First</th>
                <th>First Scores</th>
                <th>Third Scores</th>
                <th>Third</th>
                <th>Options</th>
              </tr>
              </thead>
              <tbody>
              {this.renderGames()}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
  }
}
