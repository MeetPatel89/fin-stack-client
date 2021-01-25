// make React available
import React from 'react';

// make the ReactDOM available necessary for rendering the component
import ReactDOM from 'react-dom';

// make the Landing component available
import Landing from './Landing';

describe('Landing Component', () => {
  // this is the test case
  it('renders component without crashing', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');

    // render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(<Landing />, div);

    // clean up code
    ReactDOM.unmountComponentAtNode(div);
  });
});
