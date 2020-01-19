import React, { useState, useEffect }           from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer }                        from "react-router-bootstrap";
import { API }                                  from "aws-amplify";
import "./css/Home.css";

export default function Home(props) {
  const [minions, setMinions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      /*if (!props.isAuthenticated) {
        return;
      }*/

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
      <LinkContainer key={minion.minionId} to={`/minions/${minion.minionId}`}>
        <ListGroupItem>
         	<h4>{minion.descricao}</h4>
        </ListGroupItem>
      </LinkContainer>
    ) : (
      
        <ListGroupItem>
          <h4>
            <b>{"\uFF0B"}</b> Escolha seu minion
          </h4>
        </ListGroupItem>
      
    )
  );
}

  function renderMinions() {
    return (
      <div className="notes">
        <PageHeader>Escolha seu boneco!</PageHeader>
        <ListGroup>
          {renderMinionsList(minions)}
        </ListGroup>
        <p className={(props.isAuthenticated) ? 'autenticado':'nao-autenticado' }>Faça login para reservar um boneco</p>
      </div>
    );
  }

  return (
    <div className="Home">
      {renderMinions()}
    </div>
  );
}