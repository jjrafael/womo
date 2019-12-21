import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logout } from '@store/actions/user/';

export class Logout extends Component {
  componentDidMount () {
    this.props.logout();
  }

  render () {
    return (
      <div className="my-4 text-center">Logging you out.</div>
    );
  }
}

export default connect(null, { logout })(Logout);