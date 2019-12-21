import React, { Component } from 'react';
import { Icon } from 'antd';

import classes from './SearchForm.scss';

const { searchForm, header, body, btnPrimary } = classes;

export class SearchForm extends Component {
  constructor () {
    super();

    this.state = {};
  }

  render () {
    const { onSave, saving } = this.props;

    return (
      <div className={`mr-4 ${searchForm}`}>
        <div className={header}>
          SEARCH
          <button disabled={saving} className={btnPrimary} onClick={onSave}>
            <Icon type="save" />
          </button>
          <button>
            <Icon type="copy" />
          </button>
          <div className="clearfix" />
        </div>
        <div className={body}></div>
      </div>
    );
  }
}

export default SearchForm;