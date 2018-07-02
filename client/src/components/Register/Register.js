import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  onChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    axios.post('/api/users/register', newUser)
      .then(result => console.log(result))
      .catch(error => this.setState({ errors: error.response.data }));
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmitHandler} noValidate>
                <div className="form-group">
                  <input 
                    type="text" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.name
                    })} 
                    placeholder="Name" 
                    name="name" 
                    value={this.state.name} 
                    onChange={this.onChangeHandler} />
                    {errors.name ? <div className="invalid-feedback">{errors.name}</div> : null}
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })} 
                    placeholder="Email Address" 
                    name="email" 
                    value={this.state.email}
                    onChange={this.onChangeHandler} />
                  {errors.email ? <div className="invalid-feedback">{errors.email}</div> : null}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })} 
                    placeholder="Password" 
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangeHandler} />
                    {errors.password ? <div className="invalid-feedback">{errors.password}</div> : null }
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password2
                    })}
                    placeholder="Confirm Password" 
                    name="password2" 
                    value={this.state.password2}
                    onChange={this.onChangeHandler} />
                    {errors.password2 ? <div className="invalid-feedback">{errors.password2}</div> : null }
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

Register.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  password2: PropTypes.string,
  errors: PropTypes.object
}

export default Register;