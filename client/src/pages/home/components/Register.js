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
import {register} from '../../../actions/userAction';

class Register extends Component {
  onChange = (item, event) => {
    this.setState({
      [item]: event.target.value,
    });
  };

  onSubmit = () => {
    const {username, password, password2} = this.state;
    const {onAsync, onRegister} = this.props;
    if (password === password2) {
      onAsync(
        register({
          username,
          password: md5(password),
        })
      ).then(() => {
        this.clearState();
        onRegister();
      });
    } else {
      // TODO:
    }
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
      password2: '',
    });
  };

  render() {
    return (
      <Modal className="register" isOpen autoFocus={true} centered={true}>
        <ModalHeader>Register</ModalHeader>
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
                Password:
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
            <FormGroup row>
              <Label for="password2" sm={2}>
                Password Confirm:
              </Label>
              <Col sm={10}>
                <Input
                  type="password"
                  name="password2"
                  id="password2"
                  onChange={event => this.onChange('password2', event)}
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

export default Register;
