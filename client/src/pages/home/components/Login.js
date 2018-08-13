import React, {Component} from 'react';
import md5 from 'js-md5';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {login} from '../../../actions/userAction';

class Login extends Component {
  onChange = (item, event) => {
    this.setState({
      [item]: event.target.value,
    });
  };

  onSubmit = () => {
    const {username, password} = this.state;
    const {onAsync, onLogin} = this.props;
    onAsync(
      login({
        username,
        password: md5(password),
      })
    ).then(() => {
      this.clearState();
      onLogin();
    });
  };

  onClose = () => {
    const {onClose} = this.props;
    this.clearState();
    onClose();
  };

  clearState = () => {
    this.setState({
      username: '',
      password: '',
    });
  };

  render() {
    return (
      <Modal className="login" isOpen autoFocus={true} centered={true}>
        <ModalHeader>Log in</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="username" sm={2}>
                Username:{' '}
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  onChange={event => this.onChange('username', event)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={2}>
                Password:{' '}
              </Label>
              <Col sm={10}>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={event => this.onChange('password', event)}
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.onSubmit('user')}>
            Submit
          </Button>
          <Button outline onClick={this.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default Login;
