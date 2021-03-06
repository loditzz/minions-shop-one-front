import { LinkContainer }              from "react-router-bootstrap";
import { Auth }                       from "aws-amplify";
import React, { useState, useEffect } from "react";
import { Link, withRouter }           from "react-router-dom";
import { Navbar, Nav, NavItem }       from "react-bootstrap";
import Routes                         from "./Routes";
import "./App.css";


function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleSair() {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push("/login");
  }

  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Início</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/pedidos">
                    <NavItem>Minhas Reservas</NavItem>
                  </LinkContainer>
                  <NavItem onClick={handleSair}>Sair</NavItem>
                </>
              ) : (
                <>
                  <LinkContainer to="/cadastro">
                    <NavItem>Cadastre-se</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
              )}
            </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default withRouter(App);