import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import FormPage from './_FormPage';

// TODO: renders proper tags
// TODO: renders <FormSecurity /> when security role
// TODO: NOT render <FormSecurity /> when NOT security role
// TODO: renders <FormJustifications /> when justifications needed
// TODO: NOT render <FormJustifications /> when justifications NOT needed

const setup = () => {
  const props = {

  };
  return shallow(<FormPage {...props} />);
};

describe('FormPage', () => {
  it('TODO...', () => {
    expect(true).toEqual(true);
  });
});
