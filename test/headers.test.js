import { localize } from '@lion/localize';
import '../../locale/inline-data.js';
import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/header/Header.js';



describe('loan-header', () => {
  // Write test cases inside this block
  let element;

  beforeEach(async () => {
    element = await fixture(html`<loan-header></loan-header>`);
  });

  it('should render the header with correct initial state', () => {
    expect(element.shadowRoot.querySelector('header')).to.exist;
    expect(element.shadowRoot.querySelector('#en-GB')).to.have.class('bg-btn-color');
    expect(element.shadowRoot.querySelector('#nl-NL')).to.have.class('btn-cursor');
  });

  it('should have correct initial styling', () => {
    const enButton = element.shadowRoot.querySelector('#en-GB');
    const nlButton = element.shadowRoot.querySelector('#nl-NL');

    expect(enButton).to.have.class('bg-btn-color');
    expect(nlButton).to.have.class('btn-cursor');
  });
});
 