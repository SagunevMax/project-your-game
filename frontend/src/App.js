import React from "react";
import Header from "./components/Header";
import EnterPlayersNames from "./components/EnterPlayersNames";
import GameTable from './components/GameTable'
import { Route } from 'react-router-dom'
function App() {
  return (
    <div>
      <Header />
      <Route exact path='/' component={EnterPlayersNames} />
      <Route path='/game' component={GameTable} />
    </div>
  );
}
export default App;
