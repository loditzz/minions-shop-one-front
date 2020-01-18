import React             from "react";
import { Route, Switch } from "react-router-dom";

//CONTAINERS
  import Home     from "./containers/Home";
  import NotFound from "./containers/NotFound";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />

      { /* Após testar todas as rotas, cai na rota padrão e emite mensagem de erro 404 */ }
	  <Route component={NotFound} />
    </Switch>
  );
}