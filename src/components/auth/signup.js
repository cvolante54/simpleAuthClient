import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  componentWillMount(){
    this.props.refreshError();
  }
  
  handleFormSubmit( { email, password, passwordConfirm } ) {
    console.log(email, password, passwordConfirm);
    //need to do something to log user in
    this.props.signupUser({email, password});
  }

  renderField({ input, label, type, meta: { touched, error } }){
    return (
      <fieldset className={`form-group ${touched && error ? 'has-danger': ''}`}>
        <label>{label}</label>
        <input type={type} {...input} className="form-control" />
        {touched && error && <span className="error">{error}</span>}
      </fieldset>
    );
  }

  renderAlert(){
    if( this.props.errorMessage ){
      return (
        <div className="alert alert-danger">
          <strong>Ooops!! </strong>
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render(){
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          label="Email"
          name="email"
          type="email"
          component={this.renderField}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          component={this.renderField}
        />
        <Field
          label="Confirm Password"
          name="passwordConfirm"
          type="password"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}

function validate(formProps){
  const errors = {};

  //check that password and confirm password match
  if(!formProps.password){
    errors.password = 'Required';
  }
  else if(!formProps.passwordConfirm){
    errors.passwordConfirm = 'Required';
  }
  else if(formProps.password != formProps.passwordConfirm){
    errors.passwordConfirm = 'Passwords must match';
  }

  //check that the user provided a valid email
  if (!formProps.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address'
  }

  return errors;
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(connect(mapStateToProps, actions)(Signup));
