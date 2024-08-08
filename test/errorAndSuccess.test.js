import { html, fixture, expect, aTimeout } from '@open-wc/testing';
// import { stub } from 'sinon';
import { Router } from '@vaadin/router';
import sinon from 'sinon';
import '../src/SuccessAndError/Success.js';
import '../src/SuccessAndError/Error.js';

describe('Success screen ', () => {
    let routerGoStub;

    beforeEach(() => {
      // Stub the Router.go method to avoid actual navigation
      routerGoStub = sinon.stub(Router, 'go');
    });
  
    afterEach(() => {
      // Restore the original method
      routerGoStub.restore();
    });
    
    it('should display the correct text and button', async () => {
      const el = await fixture(html`<loan-success></loan-success>`);
      
      // Check if the heading is rendered correctly
      const heading = el.shadowRoot.querySelector('h2');
      expect(heading.textContent).to.include('Congratulations'); // Adjust based on your locale
  
      // Check if the description is rendered correctly
      const description = el.shadowRoot.querySelector('p');
      expect(description.textContent).to.include('Your loan application was successful.'); // Adjust based on your locale
  
      // Check if the button is rendered correctly
      const button = el.shadowRoot.querySelector('lion-button');
      expect(button.textContent).to.include('Home');
    });
  
    it('should navigate to home on button click', async () => {
      const el = await fixture(html`<loan-success></loan-success>`);
      
      // Query the button element
      const button = el.shadowRoot.querySelector('lion-button');
      
      // Simulate button click
      button.click();
  
      // Verify Router.go was called with '/'
      expect(routerGoStub.calledOnce).to.be.true;
      expect(routerGoStub.calledWith('/')).to.be.true;
    });
});

describe('error screen', () => {
    let routerGoStub;

  beforeEach(() => {
    // Stub the Router.go method to avoid actual navigation
    routerGoStub = sinon.stub(Router, 'go');
  });

  afterEach(() => {
    // Restore the original method
    routerGoStub.restore();
  });

  it('should display the correct text and button', async () => {
    const el = await fixture(html`<loan-error></loan-error>`);
    
    // Check if the heading is rendered correctly
    const heading = el.shadowRoot.querySelector('h2');
    expect(heading.textContent).to.include('Oops'); // Adjust based on your locale

    // Check if the description is rendered correctly
    const description = el.shadowRoot.querySelector('p');
    expect(description.textContent).to.include('Something went wrong.'); // Adjust based on your locale

    // Check if the button is rendered correctly
    const button = el.shadowRoot.querySelector('lion-button');
    expect(button.textContent).to.include('Home');
  });

  it('should navigate to home on button click', async () => {
    const el = await fixture(html`<loan-error></loan-error>`);
    
    // Query the button element
    const button = el.shadowRoot.querySelector('lion-button');
    
    // Simulate button click
    button.click();

    // Verify Router.go was called with '/'
    expect(routerGoStub.calledOnce).to.be.true;
    expect(routerGoStub.calledWith('/')).to.be.true;
  });
  
});
