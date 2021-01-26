import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DisplayCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let categories = this.props.categories;
    if (this.props.newBalanceCat) {
      categories.push(this.props.newBalanceCat);
    }
    if (this.props.newExpenseCat) {
      categories.push(this.props.newExpenseCat);
    }

    const displayCat =
      categories &&
      categories.map((category, i) => {
        return (
          <div key={i} className='category'>
            {category}
          </div>
        );
      });
    return (
      <>
        <h2>{this.props.type} Categories</h2>
        {displayCat}
      </>
    );
  }
}

DisplayCategories.propTypes = {
  categories: PropTypes.array,
  type: PropTypes.string,
  newExpenseCat: PropTypes.string,
  newBalanceCat: PropTypes.string,
};

DisplayCategories.defaultProps = {
  categories: [],
  type: '',
  newExpenseCat: '',
  newBalanceCat: '',
};
