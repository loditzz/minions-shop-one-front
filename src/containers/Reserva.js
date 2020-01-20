import React, { useState, useEffect }         from "react";
import { API, Auth}                           from "aws-amplify";
import { Col, Thumbnail, Button, Grid, Row  } from "react-bootstrap";
import LoaderButton                           from "../components/LoaderButton";

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
        const { descricao, minionId } = minion;

        setContent(minionId);
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

 async function enviaEmail(){
    var data = minion;
    var email = await Auth.currentAuthenticatedUser().then((user)=>{
        return user.attributes.email;     
      });
    data.usuario = email;
    console.log(data);
    return API.post("minions-shop-one", `/emailone`, {
      body: data
    });
  }  

  async function handleSubmit(event) {

    event.preventDefault();

    setIsLoading(true);
    try {
      await savePedido({
        content
      });
      enviaEmail();
      alert('Minion reservado com sucesso!')
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
          <Grid>
  <Row>
    <Col xs={12} md={12}>
      <Thumbnail src={`http://minions-shop.s3.us-east-2.amazonaws.com/${minion.pic}`} alt="Minion-Pic">
        <h3><b>Reservar: </b>{minion.descricao}</h3>
        <p><b>Referencia: </b>{minion.minionId}</p>
        <p>
        <LoaderButton
            block
            type="submit"
            bsStyle="primary"
            isLoading={isLoading}
          >
            Confirmar Reserva
          </LoaderButton>
        </p>
      </Thumbnail>
    </Col>
  </Row>
</Grid>    
        </form>
      )}
    </div>
  );
}