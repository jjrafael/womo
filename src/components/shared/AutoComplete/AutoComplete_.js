import React, { Component } from 'react';
import _isFunction from 'lodash.isfunction';
import { AutoComplete as AntdAutoComplete, Input, Icon } from 'antd';

import classes from './AutoComplete.scss';

class AutoComplete extends Component {
  requestRef = null
  state = {
    value: '',
    isFocused: false,
    hasSelected: false,
    isLoading: false,
    dataSource: [],
    autoCompleteProps: {}
  }

  onChangeHandler_ = (val = '') => {
    const { onChange } = this.props;
    this.setState({ hasSelected: false });
    if (_isFunction(onChange)) {
      onChange(val);
    }
  }

  setDataSource = (error, dataSource = []) => {
    if (!error) {
      dataSource = Array.isArray(dataSource) ? dataSource : [];
      this.setState({
        dataSource,
        isLoading: false
      });
    }
  }

  onChangeHandler = (value = '') => {
    const { source, onChange } = this.props;
    onChange(value);
    this.setState(state => {
      return {
        ...state,
        isLoading: value && _isFunction(source),
        value,
        dataSource: []
      };
    }, () => {
      clearTimeout(this.requestRef);
      if (value) {
        this.requestRef = setTimeout(() => {
          if (_isFunction(source)) {
            source(value, this.setDataSource);
          }
        }, 500);
      }
    });
  }

  onSelectHandler = (value, optInstance) => {
    const { onSelect } = this.props;
    this.setState({ hasSelected: true });
    if (_isFunction(onSelect)) {
      onSelect(value, optInstance);
    }
  }

  render () {
    const { onChangeHandler, onSelectHandler } = this;
    const { isFocused, hasSelected, isLoading, dataSource } = this.state;
    const { onKeyUp, ...autoCompleteProps } = this.props;
    const newAutoCompleteProps = {
      ...autoCompleteProps,
      dataSource,
      allowClear: true,
      onChange: onChangeHandler,
      onSelect: onSelectHandler,
      onBlur: () => this.setState({ isFocused: false }),
      onFocus: () => this.setState({ isFocused: true })
    };

    const inputProps = {
      onKeyUp,
      suffix: <span />
    };

    if (isFocused) {
      if (isLoading && !hasSelected) {
        inputProps.suffix = <Icon type="loading" />;
        delete newAutoCompleteProps.allowClear;
      }
    }

    return (
      <AntdAutoComplete className={classes.autoComplete} {...newAutoCompleteProps}>
        <Input {...inputProps} />
      </AntdAutoComplete>
    );
  }
}

AutoComplete.defaultProps = {
  dataSource: [],
  isLoading: false,
  onClear: () => {}
};

export default AutoComplete;