import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
}                          from "react-bootstrap";
import React, { useState } from "react";
import LoaderButton        from "../components/LoaderButton";
import { useFormFields }   from "../libs/hooksLib";
import { Auth }            from "aws-amplify";
import "./css/Cadastro.css";

export default function Cadastro(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validaCampos() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validaSenhas(){
    return(
        ( fields.email.length !== 0 ||
        fields.password.length !== 0 ) &&
        fields.password !== fields.confirmPassword
      );
  }

  function validaCampoConfirmacao() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
  event.preventDefault();

  setIsLoading(true);

  try {
    const newUser = await Auth.signUp({
      username: fields.email,
      password: fields.password
    });
    setIsLoading(false);
    setNewUser(newUser);
  } catch (e) {
    alert(e.message);
    console.log(e);
    setIsLoading(false);
  }
}

async function handleConfirmationSubmit(event) {
  event.preventDefault();

  setIsLoading(true);

  try {
    await Auth.confirmSignUp(fields.email, fields.confirmationCode);
    await Auth.signIn(fields.email, fields.password);

    props.userHasAuthenticated(true);
    props.history.push("/");
  } catch (e) {
    alert(e.message);
    setIsLoading(false);
  }
}

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Código de Confirmação</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <HelpBlock>Insira o código de confirmação enviado por email.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validaCampoConfirmacao()}
        >
          Verify
        </LoaderButton>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Senha</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirme a senha</ControlLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </FormGroup>
        <p className={(validaSenhas())? 'senhas-diferentes':'senhas-iguais' }>Senhas devem ser iguais</p>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validaCampos()}
        >
          Cadastrar
        </LoaderButton>
      </form>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}