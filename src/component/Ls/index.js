/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './index.css';
import { setDirectory } from '../../services/directory';

const Ls = (props) => {
  const { files, dirs, expanded } = props;

  const getDirSpan = (d) => (
    <span
      onClick={() => setDirectory(d)}
      className="content dir"
      key={d.name}
    >
      {d.name}
    </span>
  );

  const getFileSpan = (f) => {
    if (f.link) {
      return (
        <a className="content file link" key={f.name} href={f.link} target="_blank" rel="noopener noreferrer">
          {f.name}
        </a>
      );
    }
    return (
      <span className="content file" key={f.name}>
        {f.name}
      </span>
    );
  };

  return (
    <div>
      {expanded ? (
        <div className="container">
          <div>
            {[...dirs, ...files].map(info => (
              <div
                className="sub-container"
                key={info.name}
              >
                <div className="title">
                  {info.file ? getFileSpan(info) : getDirSpan(info)}
                </div>
              </div>
            ))}
          </div>
          <div>
            {[...dirs, ...files].map(info => (
              <div
                className="sub-container"
                key={info.name}
              >
                <div className="desc">
                  {info.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
          <div>
            {dirs.map(d => getDirSpan(d))}
            {files.map(f => getFileSpan(f))}
          </div>
        )}
    </div>
  );
};

Ls.defaultProps = {
  dirs: [],
  files: [],
  expanded: false,
};

export default Ls;
