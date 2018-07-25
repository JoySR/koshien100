import React, {Component} from 'react';
import MatchCard from './MatchCard'
import './MatchDay.css';

export default class MatchDay extends Component {
  render() {
    return (
      <div className="match-day">
        <MatchCard />
      </div>
    );
  }
}
