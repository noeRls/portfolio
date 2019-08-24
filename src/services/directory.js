const tree = {
  root: {
    name: '~',
    dirs: [
      {
        name: 'projects',
        desc: 'personal projects and the ones I\'m contributing',
        files: [
          {
            name: 'portfolio',
            desc: 'this website',
            link: 'https://noerls.com',
          },
          {
            name: 'real-time-amenagment',
            desc: 'Use augmented reality to positionate and integrate virtual furniture into your space',
            link: 'https://github.com/Yooooomi/RealTimeAmenagement',
          },
          {
            name: 'authentication-template-NodeJS',
            desc: 'Simple template to start a NodeJS backend project with Mongodb.',
            link: 'https://github.com/noeRls/Authentication-template-NodeJS',
          },
          {
            name: 'ethereum-wallet-seeker',
            desc: 'seeker of ethereum wallet with ether',
            link: 'https://github.com/noeRls/ethereumWalletSeeker',
          },
          {
            name: 'uber-bot',
            desc: 'Bot that analyse uber price to evaluate if there is a gap depending of gender and ethnic',
            link: 'https://github.com/noeRls/uber_bot',
          },
          {
            name: 'corewar',
            desc: 'Epitech project, compiler and interpreter of bytecode in C',
            link: 'https://github.com/noeRls/Corewar',
          },
        ],
      },
      {
        name: 'skills',
        desc: 'language and technology that I\'m mastering',
        files: [
          { name: 'NodeJS' },
          { name: 'ReactJS' },
          { name: 'Python' },
          { name: 'MongoDB' },
          { name: 'Blockchain', desc: 'I\'m an ethereum enthusiastic' },
          { name: 'Solidity' },
          { name: 'C++' },
          { name: 'C' },
          { name: 'HTML5' },
          { name: 'CSS' },
        ],
      },
      {
        name: 'experiances',
        desc: 'professional experiances',
        files: [
          {
            name: 'Skillz',
            desc: 'I\'m working as a blockchain developer on a platform that auto deploy nodes in a consortium.',
            label: 'june 2018 - now',
            link: 'http://skillz.io',
          },
          {
            name: 'PoC',
            desc: 'I\'m a member at PoC. It is a research and development association. We work on domains like IA, AR, Health, Security, Blockchain.',
            label: 'feb 2018 - now',
            link: 'https://www.linkedin.com/company/pocfr/about/',
          },
          {
            name: 'Farsky-Interactive',
            desc: 'I made an internship in this independent gaming studio',
            label: 'june 2015',
            link: 'https://www.farskyinteractive.com/',
          },
        ],
      },
      {
        name: 'formation',
        desc: 'diplomas and certifications',
        files: [
          {
            name: 'Epitech',
            desc: 'Epitech is an informatic school known for it\'s innovative learning method. Master in Information of technology, certification level 1 (highest level)',
            label: '3.80 GPA',
            link: 'https://www.epitech.eu/',
          },
          {
            name: 'Bac-Scientific',
            label: 'Mention: \'Assez bien\'',
          },
        ],
      },
      {
        name: 'me',
        desc: 'contacts and info about me',
        files: [
          {
            name: 'github',
            label: 'noeRls',
            link: 'https://github.com/noeRls',
          },
          {
            name: 'Linkedin',
            desc: 'Noe Rivals',
            link: 'https://www.linkedin.com/in/noe-rivals/',
          },
        ],
      },
    ],
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
