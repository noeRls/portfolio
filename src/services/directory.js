const tree = {
  root: {
    dirs: {
      projects: { name: 'projects', files: { portfolio: { name: 'portfolio', desc: 'this website' } } },
      skills: { name: 'skills' },
      experiances: { name: 'experiances' },
      certifications: { name: 'certifications' },
      me: { name: 'me' },
      contacts: { name: 'contacts' },
    },
    name: '~',
  },
};

function addInfo(base) {
  const { files, dirs } = base;
  if (files) Object.keys(files).forEach(fname => { files[fname].file = true; });
  if (dirs) {
    Object.keys(dirs).forEach(dname => { dirs[dname].dir = true; addInfo(dirs[dname]); });
  }
}
addInfo(tree.root);


let currentDir = tree.root;

function findparent(base, child) {
  if (!base.dirs) return null;
  if (base.dirs.some(dir => dir === child)) return base;
  // eslint-disable-next-line
  for (const [, value] of Object.entries(base.dirs)) {
    const parent = findparent(value);
    if (parent) return parent;
  }
  return null;
}

const getDirectory = () => currentDir;

function cdone(path, cdir) {
  if (path === '.') return cdir;
  if (path === '..') {
    const parent = findparent(tree.root);
    if (!parent) return cdir;
    return parent;
  }
  const newDir = currentDir.dirs[path];
  if (!newDir) return null;
  return newDir;
}

function getPath(path, allowFile) {
  if (!path) return currentDir;
  path = path.split('/');
  let tmpDir = currentDir;
  for (let i = 0; i < path.length; i += 1) {
    tmpDir = cdone(path[i], tmpDir);
    if (!tmpDir) {
      if (path[i].files && allowFile) {
        return path[i].files.find((_, f) => f === path[i]);
      }
      return null;
    }
  }
  return tmpDir;
}

function cd(dir) {
  if (!dir) {
    currentDir = tree.root;
    return null;
  }
  const newDir = getPath(dir, false);
  if (!newDir) return `Invalid directory '${dir}'`;
  currentDir = newDir;
  return null;
}

export { cd, getDirectory, getPath };
