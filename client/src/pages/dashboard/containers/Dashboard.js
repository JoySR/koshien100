import { connect } from 'react-redux';
import DashboardComponent from '../components/DashboardComponent';

const mapStateToProps = (state, props) => {
  const {
    area: {newAreaId, list: areas},
    prefecture: {list: prefectures},
    date: {list: dates},
    school: {list: schools},
    game: {list: games},
  } = state
  return {
    newAreaId,
    areas,
    prefectures,
    dates,
    schools,
    games,
  }
}

const Dashboard = connect(
  mapStateToProps
)(DashboardComponent);

export default Dashboard;
