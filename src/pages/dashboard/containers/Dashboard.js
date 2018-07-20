import { connect } from 'react-redux';
import DashboardComponent from '../components/DashboardComponent';

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}



const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

export default Dashboard;
