import React from 'react';
import { getPath, cd } from './directory';
import Help from '../component/Help';
import Ls from '../component/Ls';

// (dir, cmd, addToStack)

const ls = (dir, cmd, addToStack) => {
  const path = cmd && cmd.length > 0 && cmd[cmd.length - 1][0] !== '-' ? cmd[cmd.length - 1] : null;
  const info = getPath(path, true);
  if (!info) {
    addToStack(<span>{`Invalid path '${path}'`}</span>);
    return;
  }
  let expanded = false;
  if (cmd.length > 0 && cmd[0][0] === '-' && cmd[0].includes('l')) expanded = true;
  let files = [];
  let dirs = [];
  if (info.file) {
    files = [info];
  } else {
    dirs = info.dirs;
    files = info.files;
  }
  addToStack(<Ls files={files} dirs={dirs} expanded={expanded} />);
};

const commands = [
  {
    name: 'help',
    desc: 'show help',
    fct: (_, __, addToStack) => {
      addToStack(<Help commands={commands} />);
    },
  },
  {
    name: 'cd',
    desc: 'change the working directory \'cd $folder\'',
    fct: (_, cmd, addToStack) => {
      const error = cd(cmd && cmd[0]);
      if (error) addToStack(<span>{error}</span>);
    },
  },
  {
    name: 'ls',
    desc: 'list files / project',
    fct: ls,
  },
  {
    name: 'clear',
    desc: 'clear the terminal',
  },
];

export default commands;
