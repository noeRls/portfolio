import React from 'react';

const Help = (props) => {
  const { commands } = props;
  return (
    <div>
      {commands.map(cmd => (
        <div key={cmd.name}>
          <span>
            {cmd.name}
          </span>
          <span>
            &nbsp;&nbsp; - &nbsp;&nbsp;
          </span>
          <span>
            {cmd.desc}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Help;
