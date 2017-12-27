import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  componentWillMount(){
    this.props.refreshError();
  }

  handleFormSubmit( { email, password } ) {
    console.log(email, password);
    //need to do something to log user in
    this.props.signinUser({email, password});
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
    const { handleSubmit, fields: { email, password }} = this.props;

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
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}

function validate(formProps){
  const errors = {};

  //check that the user provided a valid email
  if (!formProps.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password'],
  validate
})( connect(mapStateToProps, actions)(Signin));
