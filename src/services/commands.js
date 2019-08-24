import React from 'react';
import { getPath, cd } from './directory';
import Help from '../component/Help';

// (dir, cmd, addToStack)

const ls = (dir, cmd, addToStack) => {
  const path = cmd && cmd.length > 0 && cmd[cmd.length - 1][0] !== '-' ? cmd[cmd.length - 1] : null;
  const info = getPath(path, true);
  return info;
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
    desc: 'change the working directory - \'cd $folder\'',
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
];

export default commands;
