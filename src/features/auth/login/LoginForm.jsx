import React from "react";
import { connect } from "react-redux";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { login, socialLogin } from "../AuthActions";
import SocialLogin from "../socialLogin/SocialLogin";
import { combineValidators, isRequired } from 'revalidate';

const actions = { login,socialLogin };
const validate = combineValidators ({
  email:isRequired('email'),
  password:isRequired('password')
})

const LoginForm = ({ login, socialLogin, handleSubmit, error, invalid, submitting }) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        {error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
        <br />
        <Button disabled={invalid || submitting} fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal>OR</Divider>
        <SocialLogin socialLogin={socialLogin} />
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: "loginForm", validate })(LoginForm));
