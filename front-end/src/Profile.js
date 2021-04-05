import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
  render() {
    console.log(this.props.auth0.user.name);
    return  (
      <div>
        <p>Welcome to your library {this.props.auth0.user.name}</p>
      </div>
    )
  }
}

export default withAuth0(Profile);
// const { user } = this.props.withAuth0;  this is aweseome, but I don't understand it that well yet. to be continued.