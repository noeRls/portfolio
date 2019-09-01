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
        dirs: [
          {
            name: 'hackathons',
            desc: 'list of hackathons I have participated',
            files: [
              {
                name: 'Global game jam 2018',
                desc: 'Create a video game in 48 hours on the \'transmission\' theme',
                link: 'https://globalgamejam.org/2018/games/eternal-corridor',
              },
              {
                name: 'Google hash code 2018',
                desc: 'Create a driving algorithm to spread rides (uber like)',
                label: '379/6000 (world)',
                link: 'https://github.com/Yooooomi/hascode_2018',
              },
              { name: 'Battle dev 2018', desc: 'Developer competition', label: '269/3322 (france)' },
              { name: 'Morpheus cup 2018', desc: 'A day of ideation' },
              {
                name: 'Viva tech 2018',
                desc: 'Idea to improve autonomous car. We imagined a connected windshild that communicate with pedestrian',
                link: 'https://github.com/noeRls/windshield_connected',
              },
              { name: 'Teamleader 2018', desc: 'Create and optimise a delivery algorithm', label: '2/50' },
              { name: 'MDF 2018', desc: 'Meilleur developer de france', label: '45/2000 (france)' },
              { name: 'Battle dev 2018', desc: 'Developer competition', label: '405/3914 (france)' },
              {
                name: 'Ai for a better world 2018',
                desc: `Find a way to use ai to make a better world. This hackathon lasts 3 month.
                We were a team of 5, two biologist, one geologist, two developer including me.
                Our idea was to use known position of coral to predict their possible position in unknown area.
                Once corals have been localise we use them as medecine purpose`,
                label: '1st price',
                labelImportant: true,
              },
              {
                name: 'Digital light 2019',
                desc: `Find an inovative way to use digital light on car.
                Digital light is a technology used to display informations on the road throught light.
                Our idea was to display a 3D grid to improve visibility of the road`,
                label: 'finalist',
              },
              { name: 'Battle dev 2019', desc: 'Developer competition', label: '446/3000' },
              { name: 'Viva tech 2019' },
            ],
          },
        ],
      },
      {
        name: 'skills',
        desc: 'language and technology that I\'m mastering',
        files: [
          { name: 'NodeJS', desc: 'Expert' },
          { name: 'ReactJS', desc: 'Advanced' },
          { name: 'Python', desc: 'Advanced' },
          { name: 'MongoDB', desc: 'Intermediate' },
          { name: 'Blockchain', desc: 'Advanced' },
          { name: 'Solidity', desc: 'Intermediate' },
          { name: 'C++', desc: 'Advanced' },
          { name: 'C', desc: 'Advenced' },
          { name: 'HTML5', desc: 'Intermediate' },
          { name: 'CSS', desc: 'Intermediate' },
          { name: 'SQL', desc: 'Novice' },
          { name: 'Unity3D(C#)', desc: 'Novice' },
        ],
      },
      {
        name: 'experiances',
        desc: 'professional experiances',
        files: [
          {
            name: 'Skillz',
            desc: 'I\'m working as a blockchain developer on a platform that auto deploy nodes in a consortium.',
            label: 'june 2018 to now',
            link: 'http://skillz.io',
          },
          {
            name: 'PoC',
            desc: 'I\'m a member at PoC. It is a research and development association. We work on domains like IA, AR, Health, Security, Blockchain.',
            label: 'feb 2018 to now',
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
            labelImportant: true,
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
            desc: 'noeRls',
            link: 'https://github.com/noeRls',
          },
          {
            name: 'linkedin',
            desc: 'Noe Rivals',
            link: 'https://www.linkedin.com/in/noe-rivals/',
          },
          {
            name: 'email',
            desc: 'noe.rivals@gmail.com',
            link: 'mailto:noe.rivaks@gmail.com',
          },
          {
            name: 'hobies',
            desc: 'Chess, Traveling, Video Games (LOL, RL, Smash, ...), TV Shows (GOT, Black mirror, ...).',
          },
        ],
      },
    ],
  },
};

function addInfo(base) {
  const { files, dirs } = base;
  if (files) files.forEach(f => { f.file = true; f.name = f.name.replace(/ /g, '-'); });
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
    const parent = findparent(base.dirs[i], child);
    if (parent) return parent;
  }
  return null;
}

function getAbsolutePath(dir) {
  let absPath = dir.name;
  let parent = findparent(tree.root, dir);
  while (parent) {
    if (parent === dir) return absPath;
    dir = parent;
    absPath = `${dir.name}/${absPath}`;
    parent = findparent(tree.root, dir);
  }
  return absPath;
}

const getDirectory = () => currentDir;

function cdone(path, cdir) {
  if (path === '.') return cdir;
  if (path === '..') {
    const parent = findparent(tree.root, cdir);
    if (!parent) return cdir;
    return parent;
  }
  if (!cdir.dirs) return null;
  const newDir = cdir.dirs.find(d => d.name.toLowerCase() === path);
  if (!newDir) return null;
  return newDir;
}

function getPath(path, allowFile) {
  if (!path) return currentDir;
  path = path.split('/');
  let tmpDir = currentDir;
  for (let i = 0; i < path.length; i += 1) {
    // eslint-disable-next-line no-continue
    if (path[i] === '' && i !== 0) continue; // ex: projects/ => ['projects', '']
    if (i === 0 && path[i] === '~') {
      tmpDir = tree.root;
    } else {
      const dirBcp = tmpDir;
      tmpDir = cdone(path[i], tmpDir);
      if (!tmpDir) {
        if (dirBcp.files && allowFile) {
          return dirBcp.files.find(f => f.name.toLowerCase() === path[i]);
        }
        return null;
      }
    }
  }
  return tmpDir;
}

let pastDir = null;

function cd(dir) {
  if (!dir) {
    currentDir = tree.root;
    return null;
  }
  if (dir === '-') {
    if (!pastDir) return 'No old directory';
    const tmpDir = pastDir;
    pastDir = currentDir;
    currentDir = tmpDir;
    return null;
  }
  const newDir = getPath(dir, false);
  if (!newDir) return `Invalid directory '${dir}'`;
  pastDir = currentDir;
  currentDir = newDir;
  return null;
}

export {
  cd, getDirectory, getPath, tree, getAbsolutePath,
};
