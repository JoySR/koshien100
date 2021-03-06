const WEEK_DAY = ['日', '月', '火', '水', '木', '金', '土'];

export const dateToTimestamp = date => {
  // TODO: test
  return `${new Date(date).getTime()}`;
};

export const timestampToDate = timestamp => {
  // TODO: test
  const date = timestamp ? new Date(+timestamp) : new Date();

  const year = date.getFullYear();
  const month = '0' + (date.getMonth() + 1);
  const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
  return `${year}-${month}-${day}`;
};

export const timestampToWeekDay = timestamp => {
  const date = new Date(+timestamp);
  return WEEK_DAY[date.getDay()];
};

export const dateToDateId = date => {
  // TODO: test
  return date.split('-').join('');
};

export const decodeScores = str => {
  return str.split(',');
};

export const scoresToTotalScore = (scores = []) => {
  if (scores.length === 0) {
    return '-';
  }
  return decodeScores(scores).reduce((sum, score) => {
    const tmpScore =
      score === '' || score === '-' || score === 'X' ? 0 : parseInt(score, 10);
    return +tmpScore + +sum;
  }, 0);
};

export const gameIdToDateId = gameId => {
  const dateId = String(gameId).slice(0, 8);
  return +dateId;
};

export const schoolInGamesToGamesInSchool = (schoolId, games = []) => {
  if (games.length === 0) return [];
  return games.filter(game => {
    return game.firstId === schoolId || game.thirdId === schoolId;
  });
};

export const dateIdToMonthDay = (dateId, divider) => {
  // FIXME: Which are String(s)? Which are Number(s)?
  const month = dateId.toString().slice(4, 6);
  const day = dateId.toString().slice(6);
  return `${month}${divider || '/'}${day}`;
};

export const dataIdToDataValue = ({
  id,
  dataList = [],
  fromKey,
  toKey = 'name',
}) => {
  if (dataList.length === 0) return '';
  const result = dataList.filter(data => {
    return data[fromKey] === id;
  });

  if (!result || !result[0] || !result[0][toKey]) return '';
  return result[0][toKey];
};

export const locationSearchToQuery = search => {
  if (!search) return;
  const queries = {};
  search
    .slice(1)
    .split('&')
    .forEach(query => {
      const [key, value] = query.split('=');
      queries[key] = value;
    });
  return queries;
};
