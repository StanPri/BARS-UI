import React, { PropTypes } from 'react';
import {Button} from 'react-bootstrap';


 MainForm.propTypes = {
};

function MainForm() {

  return(
    <div>
      <h2>Main form: Please agree to these terms.</h2>
      <button>Agree</button><button>Disagree</button>
    </div>
  );

}

export default MainForm;
