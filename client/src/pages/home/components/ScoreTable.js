import React, {Component} from 'react';

export default class ScoreTable extends Component {
  renderScores = scores => {
    const scoreList =
      scores.length >= 9
        ? scores.concat([])
        : scores
            .concat(['-', '-', '-', '-', '-', '-', '-', '-', '-'])
            .slice(0, 9);

    // before game start is the first score ''
    if (scoreList[0] === '') {
      scoreList[0] = '-';
    }

    return scoreList.map((score, index) => <td key={index}>{score}</td>);
  };

  render() {
    const {
      scoreTable: {first, third, isFirstHome},
    } = this.props;
    const visit = isFirstHome ? third : first;
    const home = isFirstHome ? first : third;

    const {
      name: visitName,
      scores: visitScores,
      finalScore: visitFinalScore,
    } = visit;
    const {
      name: homeName,
      scores: homeScores,
      finalScore: homeFinalScore,
    } = home;

    return (
      <table className="scoreboard">
        <tbody>
          <tr className="visit">
            <td className="name">{visitName}</td>
            {this.renderScores(visitScores)}
            <td className="final">{visitFinalScore}</td>
          </tr>
          <tr className="home">
            <td className="name">{homeName}</td>
            {this.renderScores(homeScores)}
            <td className="final">{homeFinalScore}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
