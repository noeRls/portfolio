/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import s from './index.module.css';
import { tree } from '../../services/directory';

const shortcuts = [];

const addDirs = (base, path) => {
  if (!base.dirs) return;
  base.dirs.forEach(d => {
    const p = `${path}/${d.name}`;
    shortcuts.push({ name: d.name, cmd: `ls -l ${p}` });
    addDirs(d, p);
  });
};
addDirs(tree.root, '~');


class CmdShortcut extends React.Component {
  render() {
    const {
      handleCmd, expanded, onExpand, ...others
    } = this.props;
    return (
      <div {...others}>
        <div className={s.container}>
          <div className={s.element} onClick={onExpand}>
            shortcuts
          </div>
          {shortcuts.map((short, i) => (
            <div
              className={cl(s.element, expanded ? s['element-show'] : s['element-hide'])}
              style={{ transitionDelay: `${(expanded ? i : shortcuts.length - i) * 100}ms` }}
              key={short.cmd}
              onClick={() => handleCmd(short.cmd)}
            >
              {short.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

CmdShortcut.propTypes = {
  handleCmd: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  onExpand: PropTypes.func.isRequired,
};

export default CmdShortcut;
