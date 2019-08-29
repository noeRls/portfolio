/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import cl from 'classnames';
import style from './index.module.css';
import { setDirectory } from '../../services/directory';

require('numbermap')();

class Ls extends React.Component {
  constructor(props) {
    super(props);
    const nbElement = props.dirs.length + props.files.length;
    if (props.expanded) {
      this.titlesRef = nbElement.map(() => React.createRef());
      console.log(this.titlesRef);
    }
    this.state = {
      titleWidth: 0,
      width: 0,
    };
  }

  componentDidMount() {
    const { expanded } = this.props;
    if (expanded) {
      this.onResize();
      window.addEventListener('resize', this.onResize.bind(this));
    }
  }

  componentWillUnmount() {
    const { expanded } = this.props;
    if (expanded) {
      window.removeEventListener('resize', this.onResize.bind(this));
    }
  }

  onResize = () => {
    this.setState({ titleWidth: 0, width: window.innerWidth }, this.updateTitleWidth);
  }

  updateTitleWidth = () => {
    const { width } = this.state;

    const totalWidth = this.titlesRef.reduce((acc, ref) => {
      const w = ref.current.offsetWidth;
      return acc + w;
    }, 0);
    const mean = totalWidth / this.titlesRef.length;

    const maxTitleWidth = this.titlesRef.reduce((acc, ref) => {
      const w = ref.current.offsetWidth;
      if (w > acc) return w;
      return acc;
    }, 0);

    this.setState({ titleWidth: width < 500 ? mean : maxTitleWidth });
  }

  getDir = (d) => (
    <div
      onClick={() => setDirectory(d)}
      className={cl(style.content, style.dir)}
      key={d.name}
    >
      {d.name}
    </div>
  );

  getFile = (f, removeSpaces) => {
    const name = removeSpaces ? f.name.replace(/ /g, '-') : f.name;
    if (f.link) {
      return (
        <a className={cl(style.content, style.file, style.link)} key={f.name} href={f.link} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      );
    }
    return (
      <span className={cl(style.content, style.file)} key={f.name}>
        {name}
      </span>
    );
  };

  render() {
    const { files, dirs, expanded } = this.props;
    const { titleWidth } = this.state;

    let titleStyle = {};
    if (expanded && titleWidth !== 0) {
      titleStyle = { width: titleWidth, flexShrink: 0 };
    }
    return (
      <div>
        {expanded ? (
          <div>
            {[...dirs, ...files].map((info, i) => (
              <div
                className={style.container}
                // eslint-disable-next-line react/no-array-index-key
                key={`${info.name}_${i}`}
              >
                <div
                  className={style.title}
                  ref={this.titlesRef[i]}
                  style={titleStyle}
                >
                  {info.file ? this.getFile(info) : this.getDir(info)}
                </div>
                <div className={style.desc}>
                  {info.desc}
                </div>
                {Boolean(info.label) && (
                  <div className={style.label} style={{ fontWeight: info.labelImportant ? 'bold' : undefined }}>
                    {info.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={style['pocket-container']}>
            {dirs.map(d => this.getDir(d))}
            {files.map(f => this.getFile(f, true))}
          </div>
        )}
      </div>
    );
  }
}

Ls.defaultProps = {
  dirs: [],
  files: [],
  expanded: false,
};

export default Ls;
