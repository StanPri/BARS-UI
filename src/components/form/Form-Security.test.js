import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import FormSecurity from './Form-Security';

// TODO: renders proper tags/fields
// TODO: displays help messages (figure out how they will be displayed first, part of this or other test?)

const setup = () => {
  const props = {

  };
  return shallow(<FormSecurity {...props} />);
};

describe('FormSecurity', () => {
  it('TODO...', () => {
    expect(true).toEqual(true);
  });
});
