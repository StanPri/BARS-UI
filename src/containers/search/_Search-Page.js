/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import {Button} from 'react-bootstrap';
import RequestTable from '../../components/common/RequestTable';
import FetchInProgress from '../../components/common/FetchInProgress';
import DisplayError from '../../components/common/DisplayError';
import * as requestsActions from '../../actions/requestsActions';
import * as requestFormActions from '../../actions/requestFormActions';
import * as KEYS from '../../store/keyMap';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.viewRequest = this.viewRequest.bind(this);
    this.getRequests = this.getRequests.bind(this);
  }

  componentDidMount() {
    this.getRequests();
  }

  getRequests() {
    const {actions, fetchCallsInProgress} = this.props;
    // if no fetches in progess
    if (!fetchCallsInProgress) {
      // load all requests from BARS API
      actions.requestsGetAll();
    } else {
      // other wise wait adn call API
      setTimeout(this.getRequests, 100);
    }
  }

  /**
   * Views the entry as non-approver (past requests, etc)
   */
  viewRequest(data) {
    const {actions} = this.props;
    actions.requestFormView(data);
    browserHistory.push('/form');
  }

  /**
   * Downloads the pdf of approved request
   * TODO: MOVE TO COMMON ULTIL
   */
  getPdf(data) {
    function base64ToArrayBuffer(base64) {
        var binaryString =  window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++)        {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }
    var saveByteArray = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, name) {
            var blob = new Blob(data, {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = name;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    if (data[KEYS.FORM_PDF]) {
      let content = base64ToArrayBuffer(data[KEYS.FORM_PDF]);
      saveByteArray([content], `BARS-${data[KEYS.FORM_NAME].replace(' ', '-')}.pdf`);
    }
  }

  render() {
    const {requestsAll, fetchCallsInProgress, actions, auth} = this.props;
    // display loading graphic if fetching
    if (fetchCallsInProgress) {
      return <FetchInProgress/>;
    }
    // handle api errors
    if (requestsAll.error) {
      return <DisplayError
        error={requestsAll.error}
        onClick={actions.requestsGetAll}/>;
    }
    let requests = auth[KEYS.USER_ROLE].includes(KEYS.ROLE_SECURITY) ?
      requestsAll :
      {allIds: requestsAll.allIds.filter(x => requestsAll.byId[+x][KEYS.FORM_STATUS] === KEYS.STATUS_APPROVED),
       byId: requestsAll.byId}

    return (
      <div>
        <RequestTable
          table="requestsAll"
          title="All Requests"
          rows={requests}
          onClickView={this.viewRequest}
          onClickPdf={this.getPdf}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {requestsAll: state.requestsAll, fetchCallsInProgress: state.fetchCallsInProgress, auth: state.auth};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...requestsActions,
      ...requestFormActions
    }, dispatch)
  };
}

// TODO: more specific proptypes...
SearchPage.propTypes = {
  requestsAll: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
