/**
 * NameList.js
 * renders a redux-form field
 * see http://redux-form.com/6.5.0/examples/wizard/ for example
 * and https://github.com/erikras/redux-form/issues/1037 for bootstrap sepcific
 */
import React from 'react';
import * as KEYS from '../../store/keyMap';

const NameList = ({
    hidden,
    list,
    onClick
}) => {
  let _hidden = hidden ? 'hidden' : '';
  return (
      <ul className={`form_name_list ${_hidden}`}>
        {/* display full name and email for each employee */}
        {list.allIds.map(x => <li key={x}>
          <a onClick={onClick} data-id={x}>{`${list.byId[x][KEYS.USER_NAME]} <${list.byId[x][KEYS.USER_EMAIL]}>`}</a>
        </li>)}
      </ul>
  );
};

export default NameList;
