import React from 'react';
import cl from 'classnames';
import PropTypes from 'prop-types';
import style from './index.module.css';

const File = props => {
  const { file, removeSpaces, className, ...other } = props;
  const name = removeSpaces ? file.name.replace(/ /g, '-') : file.name;
  if (file.link) {
    return (
      <a className={cl(style.file, style.link, className)} href={file.link} target="_blank" rel="noopener noreferrer" {...other}>
        {name}
      </a>
    );
  }
  return (
    <span className={cl(style.file, className)} {...other}>
      {name}
    </span>
  );
};

File.propTypes = {
  removeSpaces: PropTypes.bool,
  file: PropTypes.object.isRequired,
};

File.defaultProps = {
  removeSpaces: false,
};

export default File;
