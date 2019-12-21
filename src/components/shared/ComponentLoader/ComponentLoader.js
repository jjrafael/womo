import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Icon } from 'antd';

class LoadingComponent extends Component {
  render () {
    const { error } = this.props;
    if (error) {
      console.error(error);
    }

    return <Icon style={{ fontSize: '20px' }} type="loading-3-quarters" spin={true} />;
  }
}

const ComponentLoader = (options) => {
  const defaultOption = {
    loading: LoadingComponent
  };

  return Loadable({
    ...defaultOption,
    ...options
  });
};

export default ComponentLoader;