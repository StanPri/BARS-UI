// import expect from 'expect';
// import React from 'react';
// import {mount, shallow} from 'enzyme';
// import {RequestTableTest} from './RequestTable';
// import * as requestFormActions from '../../actions/requestFormActions';
// import * as KEYS from '../../store/keyMap';
// import {test_requestsAll_empty, test_requestsAll_data} from '../../store/testStore';
//
// const TITLE = 'test title';
//
// const setup = (rows) => {
//   const props = {
//     title: TITLE,
//     table: 'requestsAll',
//     rows: rows,
//     actions: {
//       requestFormActions
//     }
//   };
//   return mount(<RequestTableTest {...props}/>);
// };
//
// describe('components / common / RequestTable', () => {
//   it('renders properly when empty', () => {
//     // displays title and only one table
//     const wrapper = setup(test_requestsAll_empty);
//     expect(wrapper.find('h3').text()).toEqual(TITLE);
//     expect(wrapper.find('table').length).toBe(1);
//     // only single row with proper message
//     const row = wrapper.find('tbody.reactable-data').find('tr');
//     expect(row.length).toBe(1);
//     expect(row.find('td').text()).toEqual(`No ${TITLE}`);
//   });
//   it('renders properly when data', () => {
//     // displays title and only one table
//     const wrapper = setup(test_requestsAll_data);
//     expect(wrapper.find('h3').text()).toEqual(TITLE);
//     expect(wrapper.find('table').length).toBe(1);
//     // correct number of rows
//     const num_rows = test_requestsAll_data.allIds.length;
//     const rows = wrapper.find('tbody.reactable-data').find('tr');
//     expect(rows.length).toBe(num_rows);
//   });
// });
