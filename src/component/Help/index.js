import React from 'react';
import './index.css';

const Help = (props) => {
  const { commands } = props;
  return (
    <div className="container">
      <div className="sub-container name-container">
        {commands.map(cmd => (
          <div key={cmd.name}>
            <span>
              {cmd.name}
              &nbsp;-&nbsp;
            </span>
          </div>
        ))}
      </div>
      <div className="sub-container">
        {commands.map(cmd => (
          <div key={cmd.name}>
            <span>
              {cmd.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;
