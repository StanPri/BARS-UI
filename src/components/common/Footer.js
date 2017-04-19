import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Navbar} from 'react-bootstrap';
import {connect} from 'react-redux';
import {auth} from '../../actions/authActions';

let Footer = (props) => (
  <Navbar className="navbar-static-bottom">
    <Link
      to="/about"
      activeClassName="active"
      className="col-xs-12 text-center">Contact Us</Link>
    {process.env.NODE_ENV === 'development' && <select onChange={props.testUser}>
      <option/> {process.env.TEST_USERS.map(x => <option key={x.name} value={x.jwt}>
        {`${x.name} (${x.role})`}
      </option>)}
    </select>}
    <span className="version">Version {process.env.VERSION}</span>
  </Navbar>
);

Footer.propTypes = {};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch) => ({
  testUser: (e) => {
    if (e.target.value) {
      localStorage.setItem('id_token', e.target.value);
    } else {
      localStorage.removeItem("id_token");
    }
    dispatch(auth());
  }
});

// connect to redux using state and dispatch
Footer = connect(mapStateToProps, mapDispatchToProps)(Footer);

export default Footer;
