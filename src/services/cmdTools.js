import commands from './commands';

function getCmdError(cmd) {
  if (!cmd || cmd.length === 0) return 'empty command';
  cmd = cmd.split(' ');
  const commandInfo = commands.find(c => c.name === cmd[0]);
  if (!commandInfo) return `'${cmd[0]}': unknown command`;
  return null;
}

export { getCmdError };
