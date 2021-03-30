import React from 'react';
import Header from './Header';
import MyFavoriteBooks from './components/MyFavoriteBooks.js';
// import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Profile from './Profile.js';
import { withAuth0 } from '@auth0/auth0-react';

class App extends React.Component {

  render() {
    console.log('app', this.props)
    return (
      <>
        <Router>
          {<IsLoadingAndError>}
          <Header />
          <Switch>
            <Route exact path="/">
              {this.props.auth0.isAuthenticated && 
               <MyFavoriteBooks />}
              {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}
            </Route>
            <Route exact path="/profile" component={Profile}>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Route>
          </Switch>
          <Footer />
          {</IsLoadingAndError>}
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
