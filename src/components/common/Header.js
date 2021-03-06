/*eslint no-class-assign: 0*/
/*eslint-env es6*/
import React, {PropTypes} from 'react';
import {Link, IndexLink, browserHistory} from 'react-router';
import {Navbar, Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import * as requestFormActions from '../../actions/requestFormActions';
import * as KEYS from '../../store/keyMap';
const ca_gov_logo = require('../../images/ca_gov_logo.png');
const cio_logo = require('../../images/cio_logo.png');

// TODO: MOVE TO CONTAINERS...
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleRequestFormNew = this.handleRequestFormNew.bind(this);
  }

  handleRequestFormNew() {
    const {actions, destroy} = this.props;
    destroy();
    actions.requestFormReset();
    browserHistory.push('/wizard');
  }

  render() {
    const {auth} = this.props;
    return (
      <Navbar fixedTop fluid>
        <input type="checkbox" id="navbar-toggle-cbox" className="hidden"/>
        <div className="navbar-header">
          <label
            htmlFor="navbar-toggle-cbox"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
            onClick={toggleMenuOnClick}>
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </label>
          <a href="http://www.ca.gov"><img className="header-ca-logo" src={ca_gov_logo}/></a>
          <a href="http://www.cio.ca.gov" className="header-cio-logo"><img src={cio_logo}/></a>
          <h1 className="header-title">BARS</h1>
        </div>
        <div className="navbar-collapse collapse hidden" id="navbar">
          <ul className="nav navbar-nav navbar-right">
            <li onClick={toggleMenuOnClick}>
              <IndexLink to="/" activeClassName="active">
                <Button className="btn-outline">Requests List</Button>
              </IndexLink>
            </li>
            <li onClick={toggleMenuOnClick}>
              <Link>
                <Button className="btn-outline" onClick={this.handleRequestFormNew}>New Request</Button>
              </Link>
            </li>
            <li onClick={toggleMenuOnClick}>
              <Link to="/about" activeClassName="active">
                <Button className="btn-outline">About</Button>
              </Link>
            </li>
            {/* display search if security or guard */}
            {(auth[KEYS.USER_ROLE].includes(KEYS.ROLE_SECURITY) || auth[KEYS.USER_ROLE].includes(KEYS.ROLE_GUARD)) && <li onClick={toggleMenuOnClick}>
              <Link to="/search" activeClassName="active">
                <Button className="btn-outline">Search</Button>
              </Link>
            </li>}
          </ul>
        </div>
        <div id="navbar-overlay" className="hidden" onClick={toggleMenuOnClick}/>
      </Navbar>
    );
  }
}

function toggleMenuOnClick(e) {
  if (document.body.clientWidth < 768) {
    document.getElementById('navbar-overlay').classList.toggle('hidden');
    document.getElementById('navbar').classList.toggle('hidden');
  }
}

Header.propTypes = {
  destroy: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({auth: state.auth});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...requestFormActions
  }, dispatch)
});

Header = reduxForm({form: 'wizard', destroyOnUnmount: true, forceUnregisterOnUnmount: true})(Header);
export default connect(mapStateToProps, mapDispatchToProps)(Header);
