import {connect} from 'react-redux';
import LoginComponent from '../components/LoginComponent';

const mapStateToProps = state => {
  const {user} = state;
  return {
    user,
  };
};

const Login = connect(mapStateToProps)(LoginComponent);

export default Login;
