const WEEK_DAY = ['日', '月', '火', '水', '木', '金', '土'];

export const dateToTimestamp = (date) => {
  // TODO: test
  return `${new Date(date).getTime()}`;
}

export const timestampToDate = (timestamp) => {
  // TODO: test
  const date = new Date(+timestamp);

  const year = date.getFullYear();
  const month = '0' + (date.getMonth() + 1);
  const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
  return `${year}-${month}-${day}`
}

export const timestampTpWeekDay = (timestamp) => {
  const date = new Date(+timestamp);
  return WEEK_DAY[date.getDay()];

}

export const dateToDateId = (date) => {
  // TODO: test
  return date.split('-').join('');
}

export const encodeGameIds = (gameIds) => {
  return gameIds.split(',\n').join(',');
}

export const decodeGameIds = (str) => {
  return str.split(',');
}

export const decodeScores = str => {
  return str.split(',');
}

export const scoresToTotalScore = (scores) => {
  return decodeScores(scores).reduce((sum, score) => {
    const tmpScore = (score === '' || score === '-' || score === 'X') ? 0 : parseInt(score, 10);
    return +tmpScore + +sum
  }, 0)
}

export const gameIdToDate = gameId => {
  // 2018080561
  const year = gameId.slice(0, 4);
  const month = gameId.slice(4, 6);
  const day = gameId.slice(6, 8);
  return `${year}-${month}-${day}`;
}
