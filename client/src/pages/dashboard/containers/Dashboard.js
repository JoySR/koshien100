import { connect } from 'react-redux';
import DashboardComponent from '../components/DashboardComponent';

const mapStateToProps = (state, props) => {
  const {
    area: {newAreaId, list: areas},
    prefecture: {list: prefectures},
    date: {list: dates},
    school: {list: schools},
  } = state
  return {
    newAreaId,
    areas,
    prefectures,
    dates,
    schools,
  }
}

const Dashboard = connect(
  mapStateToProps
)(DashboardComponent);

export default Dashboard;
