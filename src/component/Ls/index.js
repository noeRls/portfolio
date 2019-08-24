/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import cl from 'classnames';
import style from './index.module.css';
import { setDirectory } from '../../services/directory';

require('numbermap')();

const Ls = (props) => {
  const { files, dirs, expanded } = props;

  const maxLengthName = [...dirs, ...files].reduce((acc, curr) => {
    if (curr.name.length > acc) return curr.name.length;
    return acc;
  }, 0);

  const getDirSpan = (d) => (
    <span
      onClick={() => setDirectory(d)}
      className={cl(style.content, style.dir)}
      key={d.name}
    >
      {d.name}
    </span>
  );

  const getFileSpan = (f) => {
    if (f.link) {
      return (
        <a className={cl(style.content, style.file, style.link)} key={f.name} href={f.link} target="_blank" rel="noopener noreferrer">
          {f.name}
        </a>
      );
    }
    return (
      <span className={cl(style.content, style.file)} key={f.name}>
        {f.name}
      </span>
    );
  };

  return (
    <div>
      {expanded ? (
        <div>
          {[...dirs, ...files].map(info => (
            <div
              className={style.container}
              key={info.name}
            >
              <div className={style.title}>
                {(maxLengthName - info.name.length).map(n => <span key={n}>&nbsp;</span>)}
                {info.file ? getFileSpan(info) : getDirSpan(info)}
              </div>
              <div className={style.desc}>
                {info.desc}
              </div>
            </div>
          ))}
        </div>
      ) : (
          <div className={style['pocket-container']}>
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
