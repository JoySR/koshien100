import { connect } from 'react-redux';
import DashboardComponent from '../components/DashboardComponent';

const mapStateToProps = (state, props) => {
  const {
    area: {newAreaId, list: areas}
  } = state
  return {
    newAreaId,
    areas,
  }
}



const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

export default Dashboard;
