import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import {RequestTableTest} from './RequestTable';
import * as requestFormActions from '../../actions/requestFormActions';
import {MOCK_rows_apr} from '../../MOCK/rows';
import * as KEYS from '../../store/keyMap';

// TODO: search box? pagination?
const TITLE = 'test title';

const setup = (rows = MOCK_rows_apr) => {
  const props = {
    title: TITLE,
    rows: rows,
    actions: {
      requestFormActions
    }
  };
  return mount(<RequestTableTest {...props}/>);
};

describe('components / common / RequestTable', () => {
  it('renders table and h1', () => {
    const wrapper = setup();
    expect(wrapper.find('h3').text()).toEqual(TITLE);
    expect(wrapper.find('table').length).toBe(1);
  });
  it('renders properly when empty', () => {
    const rows = [];
    const wrapper = setup(rows);
    const row = wrapper.find('tbody.reactable-data');
    expect(row.length).toBe(1);
    expect(row.find('td').text()).toEqual(`No ${TITLE}`);
  });
});
