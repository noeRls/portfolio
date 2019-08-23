import React from 'react';
import './index.css';

class CMD extends React.Component {
  render() {
    return (
      <div className="background">
        <div className="cmd-container cmd">
          <div className="cmd-button-container">
            <span className="cmd-button" style={{ backgroundColor: '#F6634F' }} />
            <span className="cmd-button" style={{ backgroundColor: '#FFBB2F' }} />
            <span className="cmd-button" style={{ backgroundColor: '#1CCC42' }} />
          </div>
        </div>
      </div>
    );
  }
}

export default CMD;
