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
      maxTitleWidth: 0,
    };
  }

  componentDidMount() {
    const { expanded } = this.props;
    if (expanded) {
      this.updateTitleWidth();
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
    this.setState({ maxTitleWidth: 0 }, this.updateTitleWidth);
  }

  updateTitleWidth = () => {
    const maxTitleWidth = this.titlesRef.reduce((acc, ref) => {
      const w = ref.current.offsetWidth;
      if (w > acc) return w;
      return acc;
    }, 0);
    this.setState({ maxTitleWidth });
  }

  getDirSpan = (d) => (
    <span
      onClick={() => setDirectory(d)}
      className={cl(style.content, style.dir)}
      key={d.name}
    >
      {d.name}
    </span>
  );

  getFileSpan = (f) => {
    if (f.link) {
      return (
        <a className={cl(style.content, style.file, style.link)} key={f.name} href={f.link} target="_blank" rel="noopener noreferrer">
          {f.name}
        </a>
      );
    }
    return (
      <span className={cl(style.content, style.file)} key={f.name}>
        {f.name}
      </span>
    );
  };

  render() {
    const { files, dirs, expanded } = this.props;
    const { maxTitleWidth } = this.state;

    return (
      <div>
        {expanded ? (
          <div>
            {[...dirs, ...files].map((info, i) => (
              <div
                className={style.container}
                key={info.name}
              >
                <div
                  className={style.title}
                  ref={this.titlesRef[i]}
                  style={{ minWidth: maxTitleWidth }}
                >
                  {info.file ? this.getFileSpan(info) : this.getDirSpan(info)}
                </div>
                <div className={style.desc}>
                  {info.desc}
                </div>
                {Boolean(info.label) && (
                  <div className={style.label}>
                    {info.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
            <div className={style['pocket-container']}>
              {dirs.map(d => this.getDirSpan(d))}
              {files.map(f => this.getFileSpan(f))}
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
