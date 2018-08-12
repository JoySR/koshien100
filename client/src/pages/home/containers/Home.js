import {connect} from 'react-redux';
import HomeComponent from '../components/HomeComponent';

const mapStateToProps = (state, ownProps) => {
  const {
    date: {list: dates, currentDateId},
    game: {list: games},
    school: {list: schools},
    prefecture: {list: prefectures},
  } = state;
  return {dates, currentDateId, games, schools, prefectures};
};

const Home = connect(mapStateToProps)(HomeComponent);

export default Home;
