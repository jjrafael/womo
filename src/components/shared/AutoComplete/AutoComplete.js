import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _isFunction from 'lodash.isfunction';
import { AutoComplete as AntdAutoComplete, Input, Icon } from 'antd';

import classes from './AutoComplete.scss';

const { array, bool, func, string } = PropTypes;

const AutoComplete = (props) => {
  const { isLoading, onChange, onSelect } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);

  const onChangeHandler = (val = '') => {
    setHasSelected(false);
    if (_isFunction(onChange)) {
      onChange(val);
    }
  };

  const onSelectHandler = (value, optInstance) => {
    setHasSelected(true);
    if (_isFunction(onSelect)) {
      onSelect(value, optInstance);
    }
  };

  const autoCompleteProps = {
    ...props,
    allowClear: true,
    onChange: onChangeHandler,
    onSelect: onSelectHandler,
    onBlur: () => setIsFocused(false),
    onFocus: () => setIsFocused(true)
  };

  let suffix = <span />;
  if (isFocused) {
    if (isLoading && !hasSelected) {
      suffix = <Icon type="loading" />;
      delete autoCompleteProps.allowClear;
    }
  }

  return (
    <AntdAutoComplete className={classes.autoComplete} {...autoCompleteProps}>
      <Input {...{ suffix }} />
    </AntdAutoComplete>
  );
};

AutoComplete.propTypes = {
  dataSource: array,
  isLoading: bool,
  onClear: func,
  onSelect: func,
  onChange: func,
  value: string
};

AutoComplete.defaultProps = {
  dataSource: [],
  isLoading: false,
  onClear: () => {}
};

export default AutoComplete;