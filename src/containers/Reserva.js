import React, { useRef, useState, useEffect } from "react";
import { API}                                 from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

export default function Reserva(props) {
  const [minion, setMinion]       = useState(null);
  const [content, setContent]     = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function loadMinion() {
      console.log(props.match.params.id);
      return API.get("minions-shop-one", `/minions/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const minion        = await loadMinion();
        const { descricao } = minion;

        setContent(descricao);
        setMinion(minion);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function savePedido(minion) {
    return API.post("minions-shop-one", `/pedidos`, {
      body: minion
    });
  }

  async function handleSubmit(event) {

    event.preventDefault();

    setIsLoading(true);
    try {
      await savePedido({
        content
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Notes">
      {minion && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="content">
          <FormControl
              value={minion.minionId}
              componentClass="textarea"
            />
            <img src={`http://minions-shop.s3.us-east-2.amazonaws.com/${minion.pic}`}></img>
            <h2><b>Reservar: </b>{minion.descricao}</h2>
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
          >
            Confirmar Reserva
          </LoaderButton>
        </form>
      )}
    </div>
  );
}