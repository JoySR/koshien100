import React, {Component} from 'react';
import MatchCard from './MatchCard'
import './MatchDay.css';
import {fetchGames} from '../../../actions/gameAction'
import {fetchSchools} from '../../../actions/schoolAction'
import {fetchPrefecture} from '../../../actions/prefectureAction'
import SchoolCard from './SchoolCard'

export default class MatchDay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSchool: undefined,
    }
  }

  componentDidMount() {
    const {onAsync} = this.props;
    onAsync(fetchGames()).then(() => {
      setInterval(() => onAsync(fetchGames()), 1000 * 60);
    });
    onAsync(fetchSchools());
    onAsync(fetchPrefecture())
  }

  onShowSchool = (schoolId) => {
    const {schools} = this.props;

    const currentSchool = schools.filter(school => {
      return school.school_id === schoolId;
    })[0];

    this.setState({
      currentSchool,
    });
  }

  onCloseCard = () => {
    this.setState({
      currentSchool: null,
    })
  }

  render() {
    const {currentDateId, games = [], schools = [], prefectures = []} = this.props;
    const {currentSchool} = this.state;
    const currentGames = games.length ? games.filter(game => {
      const gameId = `${game.game_id}`;
      return gameId && gameId.includes(`${currentDateId}`)
    }) : [];


    return (
      <div className="match-day">
        {currentGames.map((game) => {
          return  <MatchCard onShowSchool={this.onShowSchool} game={game} key={game.id} schools={schools} prefectures={prefectures} currentDateId={currentDateId} />
        })}
        <SchoolCard onCloseCard={this.onCloseCard} prefectures={prefectures} school={currentSchool} games={games} schools={schools} />
      </div>
    );
  }
}
