import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  onChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(user);
  }

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmitHandler}>
                <div className="form-group">
                  <input 
                    type="email" 
                    className="form-control form-control-lg" 
                    placeholder="Email Address" 
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeHandler} />
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className="form-control form-control-lg" 
                    placeholder="Password" 
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangeHandler} />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string
}

export default Login;