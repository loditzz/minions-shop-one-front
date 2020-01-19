import React, { useState, useEffect }           from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer }                        from "react-router-bootstrap";
import { API }                                  from "aws-amplify";
import "./css/Pedidos.css";

export default function Pedidos(props) {
  const [pedidos, setpedidos]     = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const pedidos = await loadPedidos();
        setpedidos(pedidos);
      } catch (e) {
        alert(e);
        console.log(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadPedidos() {
    return API.get("minions-shop-one", "/pedidos");
  }

  function renderPedidoList(pedidos) {
    return [{}].concat(pedidos).map((pedido, i) =>
     pedidos.length > 0? (
        i>0 ?
          (<ListGroupItem header={pedido.pedidoId}>
            <p>Referencia: {pedido.minionId}</p>
            {"Reservado em: " + new Date(pedido.createdAt).toLocaleString()}
          </ListGroupItem>) : ( 
          <ListGroupItem>
            <h4>
              <b> Sua lista de Reservas</b>
            </h4>
          </ListGroupItem>)
      ) : (<p>Você ainda não reservou nenhum minion. Vá para a página inicial e escolha um minion para reservar.</p>)
    );
  }

  function renderNenhumPedido() {
    return (
      <div className="lander">
        <h1>Você ainda não reservou nenhum minion</h1>
        <p>Vá para a página inicial e escolha um minion para reservar!</p>
      </div>
    );
  }

  function renderPedidos() {
    return (
      <div className="notes">
        <ListGroup>
          {!isLoading && renderPedidoList(pedidos)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {renderPedidos() }
    </div>
  );
}