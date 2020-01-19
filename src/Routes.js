import React             from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute      from "./components/AppliedRoute";

//CONTAINERS
  import Home     from "./containers/Home";
  import Login    from "./containers/Login";
  import Cadastro from "./containers/Cadastro";
  import Pedidos  from "./containers/Pedidos";
  import Reserva  from "./containers/Reserva";
  import NotFound from "./containers/NotFound";

//ROTAS
  export default function Routes({ appProps }) {
    return (
      <Switch>
        <AppliedRoute path="/"                   exact component={Home}     appProps={appProps} />
        <AppliedRoute path="/login"              exact component={Login}    appProps={appProps} />
        <AppliedRoute path="/cadastro"           exact component={Cadastro} appProps={appProps} />
        <AppliedRoute path="/Pedidos"            exact component={Pedidos}  appProps={appProps} />
        <AppliedRoute path="/reservar/:id"       exact component={Reserva}  appProps={appProps} />

        { /* Após testar todas as rotas, cai na rota padrão e emite mensagem de erro 404 */ }
	    <Route component={NotFound} />
      </Switch>
    );
  }