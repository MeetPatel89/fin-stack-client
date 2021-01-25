// make React available
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// make the ReactDOM available necessary for rendering the component
import ReactDOM from 'react-dom';

// make the Header component available
import Header from './Header';

describe('Header Component', () => {
  // this is the test case
  it('renders component without crashing', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');

    // render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      div
    );

    // clean up code
    ReactDOM.unmountComponentAtNode(div);
  });
});
