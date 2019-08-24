import React from 'react';
import s from './index.module.css';

require('numbermap')();

const Help = (props) => {
  const { commands } = props;
  const maxNameLen = commands.reduce((acc, cmd) => {
    if (cmd.name.length > acc) return cmd.name.length;
    return acc;
  }, 0);
  return (
    <div>
      {commands.map(cmd => (
        <div key={cmd.name} className={s.container}>
          <div className={s['name-container']}>
            <span>
              {(maxNameLen - cmd.name.length).map(n => <span key={n}>&nbsp;</span>)}
              {cmd.name}
            </span>
          </div>
          <div className={s['desc-container']}>
            <span>
              &nbsp;
              {cmd.desc}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Help;
