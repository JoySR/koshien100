import {connect} from 'react-redux';
import RegisterComponent from '../components/RegisterComponent';

const mapStateToProps = state => {
  const {user} = state;
  return {
    user,
  };
};

const Register = connect(mapStateToProps)(RegisterComponent);

export default Register;
