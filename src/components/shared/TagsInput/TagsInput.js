import React, { useState } from 'react';
import _isFunction from 'lodash.isfunction';
import { Tag, AutoComplete, Input, Icon } from 'antd';

import classes from './TagsInput.scss';

const TagsInput = (props) => {
  const { tags, onRemoveTag, onAddTag, isLoading, suggestions } = props;
  const [searchBoxValue, setSearchBoxValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [inputId] = useState(`${Date.now()}`);

  const selectedTags = tags.map((tag, i) => {
    const { text, className } = tag;
    const tagProps = {
      className: ['mx-1 mt-1', className].join(' '),
      closable: true
    };

    if (_isFunction(onRemoveTag)) {
      tagProps.onClose = (e) => {
        e.preventDefault();
        onRemoveTag(tag);
      };
    }

    return (
      <Tag key={i} {...tagProps}>{text}</Tag>
    );
  });

  const handleKeyUp = (e) => {
    if (searchBoxValue && e.key === 'Enter') {
      if (_isFunction(onAddTag)) {
        onAddTag(searchBoxValue.trim());
      }

      setSearchBoxValue('');
      props.onInputChange('');
    }
  };

  const handleInputchange = (value) => {
    props.onInputChange(value.trim());
    setSearchBoxValue(value);
  };

  const handleOptionSelect = (textVal) => {
    props.onAddTag(textVal);
    setSearchBoxValue('');
  };

  const handleClearText = () => {
    setSearchBoxValue('');
    props.onInputChange('');
    document.getElementById(inputId).focus();
  };

  const renderInputBox = () => {
    const componentProps = {
      size: 'small',
      placeholder: 'Add here',
      value: searchBoxValue,
      dataSource: suggestions,
      defaultActiveFirstOption: false,
      onChange: handleInputchange,
      onSelect: handleOptionSelect,
      onBlur: () => setIsFocused(false),
      onFocus: () => setIsFocused(true)
    };

    let suffix = <span />;
    if (isFocused) {
      if (isLoading) {
        suffix = <Icon type="loading" />;
      } else if (searchBoxValue) {
        suffix = <Icon type="close-circle" onClick={handleClearText} />;
      }
    }

    const searchBoxProps = {
      suffix,
      id: inputId,
      onKeyUp: handleKeyUp
    };

    return (
      <AutoComplete className={classes.autoComplete} {...componentProps}>
        <Input {...searchBoxProps} />
      </AutoComplete>
    );
  };

  return (
    <div className="tags-input">
      {renderInputBox()}
      <div className={`${classes.tagsCont} mt-1 pb-1`}>
        {selectedTags}
      </div>
    </div>
  );
};

TagsInput.defaultProps = {
  tags: [],
  suggestions: [],
  isLoading: false,
  onRemoveTag: () => {},
  onAddTag: () => {},
  onInputChange: () => {}
};

export default TagsInput;