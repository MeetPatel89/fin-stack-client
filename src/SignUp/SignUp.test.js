// make React available
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

// make the ReactDOM available necessary for rendering the component
import ReactDOM from 'react-dom';

// make the SignUp component available
import SignUp from './SignUp';

describe('SignUp Component', () => {
  // this is the test case
  it('renders component without crashing', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');

    // render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>,
      div
    );

    // clean up code
    ReactDOM.unmountComponentAtNode(div);
  });

  it ('renders the UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

  it ('renders the UI when a function prop is added to SignUp component', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <SignUp handleClick={() => {console.log("Hello SignUp!")}}/>
      </BrowserRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
});
