import React, {Component} from 'react';
import MatchCard from './MatchCard';
import './MatchDay.css';
import {fetchGames} from '../../../actions/gameAction';
import {fetchSchools} from '../../../actions/schoolAction';
import {fetchPrefecture} from '../../../actions/prefectureAction';

export default class MatchDay extends Component {
  componentDidMount() {
    const {onAsync} = this.props;
    onAsync(fetchGames()).then(() => {
      setInterval(() => onAsync(fetchGames()), 1000 * 60);
    });
    onAsync(fetchSchools());
    onAsync(fetchPrefecture());
  }

  render() {
    const {
      currentDateId,
      onShowSchool,
      games = [],
      schools = [],
      prefectures = [],
    } = this.props;
    const currentGames = games.length
      ? games.filter(game => {
          const gameId = `${game.gameId}`;
          return gameId && gameId.includes(`${currentDateId}`);
        })
      : [];

    return (
      <div className="match-day">
        {currentGames.map(game => {
          return (
            <MatchCard
              key={game.id}
              onShowSchool={onShowSchool}
              game={game}
              schools={schools}
              prefectures={prefectures}
              currentDateId={currentDateId}
            />
          );
        })}
      </div>
    );
  }
}
