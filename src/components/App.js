import React, {PropTypes} from 'react';
import {Grid} from 'react-bootstrap';
import Header from './common/Header';
import Footer from './common/Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Grid>
          {this.props.children}
        </Grid>
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
