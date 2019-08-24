/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './index.css';
import { setDirectory } from '../../services/directory';

const Ls = (props) => {
  const { files, dirs, expanded } = props;
  return (
    <div>
      {dirs.map(d => (
        <span
          onClick={() => setDirectory(d)}
          className="content dir"
          key={d.name}
        >
          {d.name}
        </span>
      ))}
      {files.map(d => (
        <span className="content file" key={d.name}>
          {d.name}
        </span>
      ))}
    </div>
  );
};

Ls.defaultProps = {
  dirs: [],
  files: [],
};

export default Ls;
