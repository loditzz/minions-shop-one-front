import React, { useState, useEffect }           from "react";
import { PageHeader, ListGroup, ListGroupItem, 
  Col, Thumbnail, Button, Grid, Row }           from "react-bootstrap";
import { LinkContainer }                        from "react-router-bootstrap";
import { API }                                  from "aws-amplify";
import "./css/Home.css";

export default function Home(props) {
  const [minions, setMinions]     = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      try {
        const minions = await loadMinions();
        setMinions(minions);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadMinions() {
    return API.get("minions-shop-one", "/minions");
  }

  function renderMinionsList(minions) {
	  return [{}].concat(minions).map((minion, i) =>
      i !== 0 ? (
	    <Col xs={6} md={4}>
      <Thumbnail src={`http://minions-shop.s3.us-east-2.amazonaws.com/${minion.pic}`} alt="242x200">
        <h3>{minion.descricao}</h3>
        <p>
        <LinkContainer key={minion.minionId} to={`/reservar/${minion.minionId}`}>
          <Button bsStyle="primary" disabled={!props.isAuthenticated}>Reservar</Button>
        </LinkContainer>
        </p>
      </Thumbnail>
    </Col>
    ) : (<p className={(props.isAuthenticated) ? 'autenticado':'nao-autenticado' }>Cadastre-se ou faça login para reservar um Minion!</p>)
	  );
  }

  function renderMinions() {
    return (
      <div className="notes">
        <PageHeader>Escolha seu boneco Minion e clique em Reservar!</PageHeader>
        <ListGroup>
          {renderMinionsList(minions)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
    <Grid>
      <Row>
        {renderMinions()}
      </Row>
    </Grid>
      
    </div>
  );
}