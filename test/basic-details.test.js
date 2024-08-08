import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import sinon from 'sinon';
import { Router } from '@vaadin/router';
import '../src/LoanBasicDetails/BasicDetails.js';

describe('Basic details', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<basic-details></basic-details>`);
  });

  it('should render with initial values', async () => {
    expect(element.shadowRoot.querySelector('lion-input')).to.exist;
    expect(element.shadowRoot.querySelector('lion-input-amount')).to.exist;
    expect(element.shadowRoot.querySelector('lion-input-range')).to.exist;
  });

  it('should call _numToWord on input amount change', async () => {
    const numToWordSpy = sinon.spy(element, '_numToWord');
    const inputAmount = element.shadowRoot.querySelector('lion-input-amount');
    
    inputAmount.value = '15000';
    inputAmount.dispatchEvent(new Event('keyup'));
    
    await element.updateComplete;
    
    expect(numToWordSpy.calledOnce).to.be.true;
    numToWordSpy.restore();
  });

  it('should show amount in words when input changes', async () => {
    const inputAmount = element.shadowRoot.querySelector('lion-input-amount');
    inputAmount.value = '15000';
    inputAmount.dispatchEvent(new Event('keyup'));
    
    await element.updateComplete;
    
    const wordDiv = element.shadowRoot.querySelector('#word');
    expect(wordDiv.innerHTML).to.include('Fifteen Thousand');
  });

  it('should highlight the amount field if amount is less than 10000', async () => {
    const amountInput = element.shadowRoot.querySelector('.amount');
    amountInput.value = '5000';
    const captureDetailsSpy = sinon.spy(element, '_captureDetails');
    
    element._captureDetails();
    await element.updateComplete;
    
    expect(amountInput.classList.contains('e-handle')).to.be.true;
    setTimeout(() => {
      expect(amountInput.classList.contains('e-handle')).to.be.false;
      captureDetailsSpy.restore();
    }, 2000);
  });

  it('should submit form and navigate to /emidetails', async () => {
    const fetchStub = sinon.stub(window, 'fetch').resolves({
      json: () => Promise.resolve({ emi: 5000 })
    });
    const routerGoStub = sinon.stub(Router, 'go');
    
    element.shadowRoot.querySelector('.type').value = 'Test Name';
    element.shadowRoot.querySelector('.amount').value = '15000';
    element.shadowRoot.querySelector('.period').value = '10';
    
    await element._captureDetails();
    
    await element.updateComplete;
    
    expect(fetchStub.calledOnce).to.be.true;
    expect(routerGoStub.calledWith('/emidetails')).to.be.true;
    
    fetchStub.restore();
    routerGoStub.restore();
  });

  it('should navigate to / on btn-previous click', async () => {
    const routerGoStub = sinon.stub(Router, 'go');
    const btnPrevious = element.shadowRoot.querySelector('.btn-previous');
    
    btnPrevious.click();
    
    await element.updateComplete;
    
    expect(routerGoStub.calledWith('/')).to.be.true;
    routerGoStub.restore();
  });
});
