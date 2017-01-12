import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import FormApproval from './Form-Approval';

// TODO: renders proper tags
// TODO: renders according to role...
// TODO: displays help messages (figure out how they will be displayed first, part of this or other test?)

const setup = () => {
  const props = {

  };
  return shallow(<FormApproval {...props} />);
};

describe('FormApproval', () => {
  it('TODO...', () => {
    expect(true).toEqual(true);
  });
});
