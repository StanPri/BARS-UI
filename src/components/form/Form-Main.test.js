import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import FormMain from './Form-Main';

// TODO: renders proper tags/fields
// TODO: hides vendors section when not vendor
// TODO: shows vendors section when vendor
// TODO: hides other area when other area not selected
// TODO: shows other area when other area selected
// TODO: displays error messages when incorrect/empty fields submitted
// TODO: displays correct when empty data
// TODO: displays correct when fields filled out
// TODO: displays help messages (figure out how they will be displayed first, part of this or other test?)

const setup = () => {
  const props = {

  };
  return shallow(<FormMain {...props} />);
};

describe('FormMain', () => {
  it('TODO...', () => {
    expect(true).toEqual(true);
  });
});
