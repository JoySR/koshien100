import React, {Component} from 'react';

export default class ScoreTable extends Component {
  renderScores = (scores) => {
    const scoreList = scores.length >= 9 ? scores.concat([]) : scores.concat(['-', '-', '-', '-', '-', '-', '-', '-', '-']).slice(0, 9);

    return scoreList.map((score, index) => <td key={index}>{score}</td>);
  }

  render() {
    const {scoreTable: {first, third, isFirstHome}} = this.props;
    const home = isFirstHome ? first : third;
    const visit = isFirstHome ? third : first;

    const {name: homeName, scores: homeScores, finalScore: homeFinalScore} = home;
    const {name: visitName, scores: visitScores, finalScore: visitFinalScore} = visit;

    return (
      <table className="scoreboard">
        <tbody>
        <tr className="home">
          <td className="name">{homeName}</td>
          {this.renderScores(homeScores)}
          <td className="final">{homeFinalScore}</td>
        </tr>
        <tr className="visit">
          <td className="name">{visitName}</td>
          {this.renderScores(visitScores)}
          <td className="final">{visitFinalScore}</td>
        </tr>
        </tbody>
      </table>
    )
  }
}
