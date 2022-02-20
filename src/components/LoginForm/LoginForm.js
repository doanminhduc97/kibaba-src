import {
  EuiButton,
  EuiFieldPassword,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
} from "@elastic/eui";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import validation from "../../utils/validation";
import SuperAgent from "../../api/SuperAgent";
import { LOGIN, LOGIN_PAGE_FAIL } from "../../stores/constants/actionTypes";
import { useHistory } from "react-router-dom";
import HTTP_STATUS_ERROR from "../../api/httpStatusCode";
// import { store } from "../../stores/store";
const LoginFormWrapper = styled.div`
  padding: 2rem;
`;

const NeedAccountLink = styled.span`
  font-size: 0.8rem;
`;
export default function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const requestUserLogin = async ({ email, password }) => {
    const userResponse = await SuperAgent.Auth.login(email, password);
    console.log("userResponse", userResponse);
    if (Object.values(HTTP_STATUS_ERROR).includes(userResponse)) {
      // error
      dispatch({
        type: LOGIN_PAGE_FAIL,
        payload: userResponse,
      });
    } else {
      // success
      dispatch({
        type: LOGIN,
        payload: userResponse,
      });
      history.push("/");
    }
    // get state from module
    // store.getState().auth.then(data => {
    //   console.log("state", data);
    // })
  };
  const validateInput = (label, value) => {
    // grab validation function and run it on input if it exists
    // if it doesn't exists, just assume the input is valid
    const isValid = validation?.[label] ? validation?.[label]?.(value) : true;
    // set an error if the validation function did NOT return true
    setErrors((errors) => ({ ...errors, [label]: !isValid }));
  };

  const handleInputChange = (label, value) => {
    validateInput(label, value);

    setForm((form) => ({ ...form, [label]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate inputs before submitting
    Object.keys(form).forEach((label) => validateInput(label, form[label]));
    // if any input hasn't been entered in, return early
    if (!Object.values(form).every((value) => Boolean(value))) {
      setErrors((errors) => ({
        ...errors,
        form: `You must fill out all fields.`,
      }));
      return;
    }

    await requestUserLogin({ email: form.email, password: form.password });
  };

  return (
    <LoginFormWrapper>
      <EuiForm
        component="form"
        onSubmit={handleSubmit}
        isInvalid={Boolean(errors.form)}
        error={[errors.form]}
      >
        <EuiFormRow
          label="Email"
          helpText="Enter the email associated with your account."
          isInvalid={Boolean(errors.email)}
          error={`Please enter a valid email.`}
        >
          <EuiFieldText
            icon="email"
            placeholder="Username"
            value={form.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            aria-label="Enter the email associated with your account."
            isInvalid={Boolean(errors.email)}
          />
        </EuiFormRow>

        <EuiFormRow
          label="Password"
          helpText="Enter your password."
          isInvalid={Boolean(errors.password)}
          error={`Password must be at least 7 characters.`}
        >
          <EuiFieldPassword
            placeholder="Password"
            value={form.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            type="dual"
            aria-label="Enter your password."
            isInvalid={Boolean(errors.password)}
          />
        </EuiFormRow>
        <EuiSpacer />
        <EuiButton type="submit" fill style={{ width: "100%" }}>
          Login
        </EuiButton>
      </EuiForm>

      <EuiSpacer size="xl" />
      <NeedAccountLink>
        Need an account? Sign up <Link to="/registration">here</Link>.
      </NeedAccountLink>
    </LoginFormWrapper>
  );
}
