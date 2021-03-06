import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import Logout from '../Logout';
class Login extends Component {
  state = {
    email: '',
    password: '',
    statusMsg: '',
    login: false,
  };

  changName = (event) => {
    const { target } = event;
    const { value, name } = target;
    if (!value) {
      alert("input shouldn't be empty!");
    }
    this.setState({ [name]: value.trim() });
  };

  goLogedin = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    axios
      .post('/api/login', { email: email.toLowerCase(), password })
      .then((res) => {
        this.setState({ statusMsg: res.data.msg, login: true });
      })
      .catch((err) => {
        this.setState({ statusMsg: err.response.data.msg });
      });
  };

  render() {
    const { email, password, statusMsg, login } = this.state;
    if (login) {
      return <Logout />;
    } else {
      return (
        <div>
          <form onSubmit={this.goLogedin}>
            <div className='form'>
              <h1 className='form-title'>Login as admin</h1>
              <input
                className='FormInput'
                type='email'
                name='email'
                placeholder='Enter your email'
                value={email}
                onChange={this.changName}
                required
              />
              <input
                className='FormInput'
                value={password}
                type='password'
                name='password'
                placeholder='Enter your password'
                onChange={this.changName}
                required
              />
              <button className='login-button' type='submit'>
                login
              </button>
              <p className='form-error'> {statusMsg}</p>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default Login;
