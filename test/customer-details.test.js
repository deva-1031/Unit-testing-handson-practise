import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import { Router } from '@vaadin/router';
import { stub } from 'sinon';
import '../src/Customer/Customer-details.js';

describe('customer details', () => {
    let fetchStub;
  let routerGoStub; 
   
      it('should display validation errors for invalid input', async () => {
        const el = await fixture(html`<customer-details></customer-details>`);
        
        // Query the form input elements
        const firstNameInput = el.shadowRoot.querySelector('#first_name');
        const lastNameInput = el.shadowRoot.querySelector('#last_name');
    
        // Set invalid values
        firstNameInput.value = 'A'; // Too short
        lastNameInput.value = 'B'; // Too short
        firstNameInput.dispatchEvent(new Event('input'));
        lastNameInput.dispatchEvent(new Event('input'));
    
        // Simulate form submission
        const form = el.shadowRoot.querySelector('lion-form');
        const submitHandler = sinon.spy();
        form.addEventListener('submit', submitHandler);
        form.requestSubmit();
    
        // Wait for validation to complete
        await el.updateComplete;
    
        // Check if validation errors are displayed
        expect(firstNameInput.classList.contains('error-handle')).to.be.true;
        expect(lastNameInput.classList.contains('error-handle')).to.be.true;
    
        // Verify submit handler was called
        expect(submitHandler.called).to.be.true;
      });

      beforeEach(() => {
        fetchStub = sinon.stub(window, 'fetch');
        routerGoStub = sinon.stub(Router, 'go');
      });
    
      afterEach(() => {
        fetchStub.restore();
        routerGoStub.restore();
      });
    
      it('should submit the form data and navigate on success', async () => {
        fetchStub.resolves({ status: 200 }); // Mock successful response
    
        const el = await fixture(html`<customer-details></customer-details>`);
        
        // Query and fill out form
        const firstNameInput = el.shadowRoot.querySelector('#first_name');
        const submitButton = el.shadowRoot.querySelector('#nextbtn');
    
        firstNameInput.value = 'John';
        firstNameInput.dispatchEvent(new Event('input'));
    
        // Simulate form submission
        submitButton.click();
    
        // Wait for fetch and navigation
        await el.updateComplete;
    
        // Verify fetch was called with correct arguments
        expect(fetchStub.calledOnce).to.be.true;
        expect(fetchStub.firstCall.args[0]).to.equal('https://loanfeapi.herokuapp.com/submit-form');
        
        // Verify router navigation
        expect(routerGoStub.calledWith('/success')).to.be.true;
      });
    
      it('should navigate to error page on failed submission', async () => {
        fetchStub.resolves({ status: 500 }); // Mock failure response
    
        const el = await fixture(html`<customer-details></customer-details>`);
        
        // Query and fill out form
        const firstNameInput = el.shadowRoot.querySelector('#first_name');
        const submitButton = el.shadowRoot.querySelector('#nextbtn');
    
        firstNameInput.value = 'John';
        firstNameInput.dispatchEvent(new Event('input'));
    
        // Simulate form submission
        submitButton.click();
    
        // Wait for fetch and navigation
        await el.updateComplete;
    
        // Verify router navigation
        expect(routerGoStub.calledWith('/error')).to.be.true;
      });
});
