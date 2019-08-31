/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import cl from 'classnames';
import PropTypes from 'prop-types';
import style from './index.module.css';
import { getAbsolutePath } from '../../services/directory';

const Directory = props => {
  const { className, dir, ...other } = props;
  return (
    <span
      onClick={() => window.handleCmd(`cd ${getAbsolutePath(dir)}`)}
      className={cl(style.dir, className)}
      {...other}
    >
      {dir.name}
    </span>
  );
};

Directory.propTypes = {
  dir: PropTypes.object.isRequired,
};

export default Directory;
