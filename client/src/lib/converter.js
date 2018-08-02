export const dateToTimestamp = (date) => {
  // TODO: test
  return `${new Date(date).getTime()}`;
}

export const timestampToDate = (timeStamp) => {
  // TODO: test
  const date = new Date(+timeStamp);
  const year = date.getFullYear();
  const month = '0' + (date.getMonth() + 1);
  const day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate();
  return `${year}-${month}-${day}`
}

export const dateToDateId = (date) => {
  // TODO: test
  return date.split('-').join('');
}

export const encodeGameIds = (gameIds) => {
  if (!gameIds) return '';
  return gameIds.join(';');
}

export const decodeGameIds = (str) => {
  return str.split(';');
}
