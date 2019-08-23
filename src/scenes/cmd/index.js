import React from 'react';
import './index.css';

class CMD extends React.Component {
  render() {
    return (
      <div className="background">
        <div className="cmd-container cmd">
          <div className="cmd-top-container">
            <span className="box" />
            <span className="box">
              Noe Rivals
            </span>
            <span className="box">
              <span className="cmd-button cmd-button-red" />
              <span className="cmd-button cmd-button-orange" />
              <span className="cmd-button cmd-button-green" />
            </span>
          </div>
          <div className="cmd-content-container">
            <div className="cmd-content cmd-content-first">
              [noe@noe-pc ~]$
            </div>
            <div className="cmd-content">
              2
            </div>
            <div className="cmd-content">
              3
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CMD;
