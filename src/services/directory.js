const tree = {
  root: {
    dirs: [
      { name: 'projects', files: [{ name: 'portfolio', desc: 'this website' }] },
      { name: 'skills' },
      { name: 'experiances' },
      { name: 'certifications' },
      { name: 'me' },
      { name: 'contacts' },
    ],
    name: '~',
  },
};

function addInfo(base) {
  const { files, dirs } = base;
  if (files) files.forEach(f => { f.file = true; });
  if (dirs) {
    dirs.forEach(d => { d.dir = true; addInfo(d); });
  }
}
addInfo(tree.root);


let currentDir = tree.root;

function findparent(base, child) {
  if (!base.dirs) return null;
  if (base.dirs.some(dir => dir === child)) return base;
  // eslint-disable-next-line
  for (let i = 0; i < base.dirs.length; i++) {
    const parent = findparent(base.dirs[i]);
    if (parent) return parent;
  }
  return null;
}

const getDirectory = () => currentDir;
const setDirectory = (dir) => { currentDir = dir; };

function cdone(path, cdir) {
  if (path === '.') return cdir;
  if (path === '..') {
    const parent = findparent(tree.root, cdir);
    if (!parent) return cdir;
    return parent;
  }
  if (!cdir.dirs) return null;
  const newDir = cdir.dirs.find(d => d.name === path);
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
        return path[i].files.find(f => f.name === path[i]);
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

export {
  cd, getDirectory, getPath, setDirectory,
};
