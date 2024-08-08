import { html, fixture, expect } from '@open-wc/testing';

import '../loan-application.js';

describe('LoanApplication', () => {
        
      it('should render the dashboard component', async () => {
        const el = await fixture(html`<loan-application></loan-application>`);
        
        // Check if the dash-board element is rendered
        const dashboard = el.shadowRoot.querySelector('dash-board');
        expect(dashboard).not.to.be.null;
      });
    
      it('should initialize with default properties', async () => {
        const el = await fixture(html`<loan-application></loan-application>`);
        
        // Check initial property values
        expect(el.title).to.equal('Hey there');
        expect(el.counter).to.equal(5);
      });
    
      it('should increment the counter', async () => {
        const el = await fixture(html`<loan-application></loan-application>`);
        
        // Simulate incrementing counter
        el.__increment();
        await el.updateComplete;
        
        // Check if counter was incremented
        expect(el.counter).to.equal(6);
      });
});
