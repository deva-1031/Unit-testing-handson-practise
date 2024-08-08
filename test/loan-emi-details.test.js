import { html, fixture, expect } from '@open-wc/testing';
import '../src/LoanEMIDetails/LoanEMIDetails.js';
import sinon from 'sinon';
import { Router } from '@vaadin/router';

describe('Loan EMI details', () => {
    let routerGoStub;

    beforeEach(() => {
      // Stub the Router.go method to avoid actual navigation
      routerGoStub = sinon.stub(Router, 'go');
      
      // Mock localStorage data
      const mockData = {
        interestRate: 5,
        monthlyEMI: 2000,
        principal: 50000,
        interest: 10000,
        totalAmount: 60000,
      };
      sinon.stub(window.localStorage, 'getItem').withArgs('emi').returns(JSON.stringify(mockData));
    });
  
    afterEach(() => {
      // Restore the original method
      routerGoStub.restore();
      window.localStorage.getItem.restore();
    });
  
    it('should display EMI details correctly', async () => {
      const el = await fixture(html`<loanemi-details></loanemi-details>`);
  
      // Verify that the details are displayed correctly
      const interestRate = el.shadowRoot.querySelector('p:nth-child(2) span');
      expect(interestRate.textContent).to.equal('5 %');
  
      const monthlyEMI = el.shadowRoot.querySelector('p:nth-child(3) span');
      expect(monthlyEMI.textContent).to.equal('2000');
  
      const principal = el.shadowRoot.querySelector('p:nth-child(4) span');
      expect(principal.textContent).to.equal('50000');
  
      const interest = el.shadowRoot.querySelector('p:nth-child(5) span');
      expect(interest.textContent).to.equal('10000');
  
      const totalAmount = el.shadowRoot.querySelector('p:nth-child(6) span');
      expect(totalAmount.textContent).to.equal('60000');
    });
  
    it('should navigate to basic details on cancel button click', async () => {
      const el = await fixture(html`<loanemi-details></loanemi-details>`);
      
      // Query the cancel button element
      const cancelButton = el.shadowRoot.querySelector('.cancel-btn');
      
      // Simulate button click
      cancelButton.click();
  
      // Verify Router.go was called with '/details'
      expect(routerGoStub.calledOnce).to.be.true;
      expect(routerGoStub.calledWith('/details')).to.be.true;
    });
  
    it('should navigate to customer details on continue button click', async () => {
      const el = await fixture(html`<loanemi-details></loanemi-details>`);
      
      // Query the continue button element
      const continueButton = el.shadowRoot.querySelector('.continue-btn');
      
      // Simulate button click
      continueButton.click();
  
      // Verify Router.go was called with '/customer'
      expect(routerGoStub.calledOnce).to.be.true;
      expect(routerGoStub.calledWith('/customer')).to.be.true;
    });
});
