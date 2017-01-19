// import expect from 'expect';
// import React from 'react';
// import {mount, shallow} from 'enzyme';
// import {RequestTable} from './RequestTable';
// import * as formActions from '../../actions/formActions';
// import {MOCK_form} from '../../MOCK/form';
// import * as KEYS from '../../store/keyMap';
//
// // TODO: renders proper tags/fields
// // TODO: hides vendors section when not vendor
// // TODO: shows vendors section when vendor
// // TODO: hides other area when other area not selected
// // TODO: shows other area when other area selected
// // TODO: displays error messages when incorrect/empty fields submitted
// // TODO: displays correct when empty data
// // TODO: displays correct when fields filled out
// // TODO: displays help messages (figure out how they will be displayed first, part of this or other test?)
//
// // TODO: search box? pagination?
// const TITLE = 'test title';
//
// const setup = (rows = MOCK_form) => {
//   const props = {
//     title: TITLE,
//     rows: rows,
//     actions: {
//       formActions
//     }
//   };
//   return mount(<RequestTable {...props}/>);
// };
//
// describe('components / common / RequestTable', () => {
//   it('renders table and h1', () => {
//     const wrapper = setup();
//     expect(wrapper.find('h3').text()).toEqual(TITLE);
//     expect(wrapper.find('table').length).toBe(1);
//   });
//   it('renders properly when empty', () => {
//     const rows = [];
//     const wrapper = setup(rows);
//     const row = wrapper.find('tbody.reactable-data');
//     expect(row.length).toBe(1);
//     expect(row.find('td').text()).toEqual(`No ${TITLE}`);
//   });
// });
