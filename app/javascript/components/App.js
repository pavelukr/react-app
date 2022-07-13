import React from "react";
import { Route, Switch } from 'react-router-dom'
import Movie from "./Movie/Movie";
import Movies from "./Movies/Movies";

const App = () => {
    return(
    <Switch>
        <Route exact path="/" component={Movies}/>
        <Route exact path="/movies/:id" component={Movie}/>
    </Switch>
   )
}

export default App