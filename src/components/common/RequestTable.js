import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';
import {Table} from 'reactable';
import {browserHistory} from 'react-router';
import RequestTableButton from './RequestTableButton';
import * as requestFormActions from '../../actions/requestFormActions';
import * as KEYS from '../../store/keyMap';

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

  // add button to copy of rows TODO: move to external function...
  const _data = rows.allIds.map(id => ({
    ...rows.byId[id],
    button: <RequestTableButton
        onClick={() => {
        actions.requestFormView(rows.byId[id]);
        browserHistory.push('/form');
      }}/>
  }));

  const _itemsPerPage = rows.allIds.length > 15 ? 15 : 0;

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
          columns={_columns}
          sortable
          itemsPerPage={_itemsPerPage}
          className="table table-bordered table-condensed"
          data={_data}/>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({state: state});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(requestFormActions, dispatch)
});

RequestTable.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export {RequestTable as RequestTableTest}; // for testing without redux
export default connect(mapStateToProps, mapDispatchToProps)(RequestTable);
