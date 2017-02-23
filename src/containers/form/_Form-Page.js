/*eslint no-class-assign: 0*/
/*eslint-env es6*/
// libraries
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
// components
import FormHeader from '../../components/form/Form-Header';
import FormMain from '../../components/form/Form-Main';
import FormAccess from '../../components/form/Form-Access';
import FormJustifications from '../../components/form/Form-Justifications';
import FormTermsApprover from '../../components/form/Form-TermsApprover';
// import FormSecurity from
// '../../components/form/Form-Security';
import FormButtons from '../../components/form/Form-Buttons';
// actions, constants, etc
import FetchInProgress from '../../components/common/FetchInProgress';
import DisplayError from '../../components/common/DisplayError';
import validate from '../wizard/validate';
import initialState from '../../reducers/initialState';
import * as requestFormActions from '../../actions/requestFormActions';
import * as empDirActions from '../../actions/empDirActions';
import * as KEYS from '../../store/keyMap';

class FormPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.state = {};
    this.errorRedirect = this.errorRedirect.bind(this);
    this.toggleReject = this.toggleReject.bind(this);
  }

  errorRedirect() {
    //TODO: redirect to homepage
    return;
  }

  toggleReject() {
    //TODO: toggle rejection component based off state
    return;
  }

  render() {
    const {handleSubmit, requestForm, auth} = this.props;
    const isApprover = requestForm[KEYS.FORM_SAM_SUPER] === auth[KEYS.USER_SAM];
    const isRecipient = requestForm[KEYS.FORM_SAM_RECEIVE] === auth[KEYS.USER_SAM];
    const isSecurity = !isRecipient && (auth[KEYS.USER_ROLE] === KEYS.ROLE_SECURITY);

    // init properties for sections of form that will change
    // cointains if should be displayed and props
    let propsAccess = {display: false, props: {}};
    let propsJustifications = {display: false, props: {}};
    let propsTermsApprover = {display: false, props: {}};
    let propsTermsRecipient = {display: false, props: {}};
    let propsSecurity = {display: false, props: {}};
    let propsReject = {display: false, props: {}};
    let propsButtons = {display: false, props: {}};

    switch (requestForm[KEYS.FORM_STATUS]) {
      case KEYS.STATUS_PEND_MGR:
        if (isApprover) {
          propsAccess = {display: true, props: {}};
          propsJustifications = {display: true, props: {}};
          propsTermsApprover = {display: true, props: {name: KEYS.FORM_TERMS_NAME_SUP, label: requestForm[KEYS.FORM_SUP_NAME]}};
          propsButtons = {display: true, props: {onClickColor: "danger", onClickText: "Reject", onClick: this.toggleReject, onSubmitText: "Accept"}};
        }
        break;
      case KEYS.STATUS_PEND_REC:
        if (isRecipient) {
          console.log("RECIPIETN");
          // return (
          //   <div>
          //     <FormHeader header="Access Requirements"/>
          //     <FormAccess singleLine/>
          //     <FormHeader header="Justifications"/>
          //     {/* <FormJustifications singleLine  /> */}
          //     <FormHeader header="Terms and Conditions"/>
          //     <FormTermsApprover
          //       name={KEYS.FORM_TERMS_NAME_SUP}
          //       label={requestForm[KEYS.FORM_SUP_NAME]}
          //       singleLine/>
          //     {/* <FormTermsRecipient
          //       name={KEYS.FORM_TERMS_NAME_REC}
          //       label={requestForm[KEYS.FORM_NAME]}
          //       singleLine/> */}
          //     <FormButtons
          //       onClickText="Reject"
          //       onClick={this.toggleReject}
          //       onSubmitText="Accept"/>
          //   </div>
          // );
        }
        break;
        // <form onSubmit={handleSubmit(onSubmit)}>   <FormHeader
        // header="Recipient Information"/>   <FormMain/>
        // <FormHeader header="Access Requirements"/>   <FormAccess
        // allDisabled singleLine/>   <FormHeader
        // header="Justifications"/>   <FormJustifications
        // allDisabled singleLine  />   <FormHeader header="Terms
        // and Conditions"/>   <FormTermsApprover disabled />
        // <FormTermsRecipient />   <FormButtons
        // onClickText="Reject" onClick={this.toggleReject}
        // onSubmitText="Accept"/> </form>
      case KEYS.STATUS_PEND_SEC:
        // <form onSubmit={handleSubmit(onSubmit)}>   <FormHeader
        // header="Recipient Information"/>   <FormMain/>
        // <FormHeader header="Access Requirements"/>   <FormAccess
        // allDisabled singleLine/>   <FormHeader
        // header="Justifications"/>   <FormJustifications
        // allDisabled singleLine  />   <FormHeader header="Terms
        // and Conditions"/>   <FormTermsApprover disabled />
        // <FormTermsRecipient disabled />   <FormSescurity />
        // <FormButtons onClickText="Reject"
        // onClick={this.toggleReject} onSubmitText="Accept"/>
        // </form>
      case KEYS.STATUS_APPROVED:
        // <form onSubmit={handleSubmit(onSubmit)}>   <FormHeader
        // header="Recipient Information"/>   <FormMain/>
        // <FormHeader header="Access Requirements"/>   <FormAccess
        // allDisabled singleLine/>   <FormHeader
        // header="Justifications"/>   <FormJustifications
        // allDisabled singleLine  />   <FormTermsApprover disabled
        // />   <FormTermsRecipient disabled />   <FormSescurity
        // disabled />   <FormButtons onClickText="Reject"
        // onClick={this.toggleReject} onSubmitText="Accept"/>
        // </form>
      case KEYS.STATUS_CANCEL_SUB:
        // <form onSubmit={handleSubmit(onSubmit)}>   <FormHeader
        // header="Recipient Information"/>   <FormMain/>
        // <FormHeader header="Access Requirements"/>   <FormAccess
        // allDisabled singleLine/>   <FormHeader
        // header="Justifications"/>   <FormJustifications
        // singleLine  />   <FormReject /> </form>
      case KEYS.STATUS_CANCEL_MGR:
        // <form onSubmit={handleSubmit(onSubmit)}>   <FormHeader
        // header="Recipient Information"/>   <FormMain/>
        // <FormHeader header="Access Requirements"/>   <FormAccess
        // allDisabled singleLine/>   <FormHeader
        // header="Justifications"/>   <FormJustifications
        // singleLine  />   <FormReject /> </form>
      case KEYS.STATUS_CANCEL_REC:
        // <form onSubmit={handleSubmit(onSubmit)}>   <FormHeader
        // header="Recipient Information"/>   <FormMain/>
        // <FormHeader header="Access Requirements"/>   <FormAccess
        // allDisabled singleLine/>   <FormHeader
        // header="Justifications"/>   <FormJustifications
        // singleLine  />   <FormTermsApprover disabled />
        // <FormReject /> </form>
      case KEYS.STATUS_CANCEL_SEC:
        // <form onSubmit={handleSubmit(onSubmit)}>   <FormHeader
        // header="Recipient Information"/>   <FormMain/>
        // <FormHeader header="Access Requirements"/>   <FormAccess
        // allDisabled singleLine/>   <FormHeader
        // header="Justifications"/>   <FormJustifications
        // singleLine  />   <FormTermsApprover disabled />
        // <FormTermsRecipient disabled />   <FormReject /> </form>
      case KEYS.STATUS_ERROR:
      default:
        // Unknown/Error State display error
        return <DisplayError onClick={this.errorRedirect}/>;
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader header="Recipient Information"/>
        <FormMain />
        {propsAccess.display && <div>
          <FormHeader header="Access Requirements"/>
          <FormAccess {...propsAccess.props} singleLine/>
        </div>}
        {propsJustifications.display && <div>
          <FormHeader header="Justifications"/>
          <FormJustifications {...propsJustifications.props} singleLine/>
        </div>}
        {propsTermsApprover.display && <div>
          <FormHeader header="Terms and Conditions"/>
          <FormTermsApprover {...propsTermsApprover.props} singleLine/>
        </div>}
        {propsTermsRecipient.display &&
          <FormTermsRecipient {...propsTermsRecipient.props} singleLine/>}
        {propsSecurity.display && <div>
          <FormHeader header="Security"/>
          <FormSescurity {...propsSecurity.props} singleLine/>
        </div>}
        {propsReject.display && <div>
          <FormHeader header="Rejection"/>
          <FormReject {...propsReject.props} singleLine/>
        </div>}
        {propsButtons.display &&
          <FormButtons {...propsButtons.props} />}
      </form>
    );
  }
}

const onSubmit = (vals) => {
  // submit goes here
  console.log(vals);
};

FormPage.propTypes = {};

// map all state (from redux store) to props
const mapStateToProps = (state, ownProps) => ({fetchCallsInProgress: state.fetchCallsInProgress, auth: state.auth, requestForm: state.requestForm, initialValues: state.requestForm});

// map all action creators to props
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...requestFormActions
  }, dispatch)
});

// connect to redux form
FormPage = reduxForm({form: 'form', destroyOnUnmount: true, forceUnregisterOnUnmount: true})(FormPage);

// connect to redux using state and dispatch
FormPage = connect(mapStateToProps, mapDispatchToProps)(FormPage);

export default FormPage;
