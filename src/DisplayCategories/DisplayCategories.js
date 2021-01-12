import React, { Component } from 'react';

export default class DisplayCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    const displayCat = (this.props.categories) &&
      this.props.categories.map(category => {
        return (
          <>
            <div className='category'>{category}</div>
          </>
        );
      }
      )
      return (
        <>
      <h2>{this.props.type} Categories</h2>
      {displayCat}
      </>
    )
    }
    
  }

