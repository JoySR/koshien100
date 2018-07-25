import { connect } from 'react-redux';
import LoginComponent from '../components/LoginComponent';

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.user.userId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}



const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export default Login;
