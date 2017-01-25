import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';
import {Table} from 'reactable';
import {browserHistory} from 'react-router';
import RequestTableButton from './RequestTableButton';
import * as formActions from '../../actions/formActions';
import * as KEYS from '../../store/keyMap';

// TODO: replace with api call
import {MOCK_form} from '../../MOCK/form';

function RequestTable({rows, title, actions}) {
  // map column keys (from api) to labels (displayed text)
  const _columns = [
    {
      key: 'button',
      label: ""
    }, {
      key: KEYS.FORM_STATUS,
      label: "Status"
    }, {
      key: KEYS.FORM_NAME,
      label: "Name"
    }, {
      key: KEYS.FORM_PHONE,
      label: "Phone"
    }, {
      key: KEYS.FORM_EMAIL,
      label: "Email"
    }, {
      key: KEYS.FORM_SUP_NAME,
      label: "Supervisor"
    }, {
      key: KEYS.FORM_SUP_PHONE,
      label: "Supervisor Phone"
    }, {
      key: KEYS.FORM_SUP_EMAIL,
      label: "Supervisor Email"
    }
  ];

  // add button to copy of rows
  const _data = JSON.parse(JSON.stringify(rows));
  _data.forEach(row => row['button'] = (<RequestTableButton
    status={row[KEYS.FORM_STATUS]}
    onClick={() => {
    actions.formView(MOCK_form);
    browserHistory.push('/form');
  }}/>));

  return (
    <Row>
      <Col xs={12}>
        <h3>{title}</h3>
        <Table
          filterable={[
          KEYS.FORM_STATUS,
          KEYS.FORM_NAME,
          KEYS.FORM_PHONE,
          KEYS.FORM_EMAIL,
          KEYS.FORM_SUP_NAME,
          KEYS.FORM_SUP_PHONE,
          KEYS.FORM_SUP_EMAIL
        ]}
          noDataText={`No ${title}`}
          itemsPerPage={10}
          columns={_columns}
          sortable
          className="table table-bordered table-condensed"
          data={_data}/>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({state: state});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(formActions, dispatch)
});

RequestTable.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  actions: PropTypes.object.isRequired
};

export {RequestTable as RequestTableTest}; // for testing without redux
export default connect(mapStateToProps, mapDispatchToProps)(RequestTable);
