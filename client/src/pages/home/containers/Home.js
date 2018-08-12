import {connect} from 'react-redux';
import HomeComponent from '../components/HomeComponent';
import {locationSearchToQuery} from '../../../lib/converter';

const mapStateToProps = (state, props) => {
  const {
    date: {list: dates, currentDateId},
    game: {list: games},
    school: {list: schools},
    prefecture: {list: prefectures},
  } = state;
  const {search} = props.location;

  return {
    dates,
    currentDateId,
    games,
    schools,
    prefectures,
    query: locationSearchToQuery(search),
  };
};

const Home = connect(mapStateToProps)(HomeComponent);

export default Home;
