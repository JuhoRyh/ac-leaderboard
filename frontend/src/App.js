import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Track from './pages/Track'
import Home from './pages/Home'
import Header from './components/Header'
import './index.css'

const App = () => {
  return(
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/track/:trackId" >
            <Track />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App