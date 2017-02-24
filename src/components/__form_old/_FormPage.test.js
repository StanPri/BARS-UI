// import expect from 'expect';
// import React from 'react';
// import {mount, shallow} from 'enzyme';
// import {FormPage} from './_FormPage';
// import FormSecurity from './Form-Security';
// import * as KEYS from '../../store/keyMap';
// import {test_form_data} from '../../store/testStore';
//
// // TODO>: roles, make global key/ update!
// const roles = ['security', 'manager', 'recipient'];
//
// const setup = ({user}) => {
//   const props = {
//     user,
//     actions: {},
//     handleSubmit: () => {}
//   };
//   return mount(<FormPage {...props}/>);
// };
//
// describe('components / form / FormPage', () => {
//   it('renders <FormSecurity /> when role is security', () => {
//     const wrapper = setup({
//       user: {
//         [KEYS.USER_ROLE]: roles[0]
//       }
//     });
//     // const security = shallow(<FormSecurity/>);
//     // expect(wrapper.find(security).length).toBe(1);
//   });
//   it('hides <FormSecurity /> when role is NOT security', () => {
//     expect(1).toBe(1);
//   });
// });
