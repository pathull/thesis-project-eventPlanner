import React from 'react';
import { mount } from 'cypress/react18';

import '../../src/index.css';

import { Login } from '../../src/components/Login/Login';

describe('Login.cy.ts', () => {
  it('playground', () => {
    mount(<Login />);
  })
});
