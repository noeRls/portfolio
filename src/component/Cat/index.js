import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import s from './index.module.css';

const Cat = props => {
  const {
    desc, name, cat, label, link,
  } = props;
  const isCat = Boolean(cat);
  return (
    <div className={s.container}>
      <div className={cl(s.name, s.capitalize)}>
        {name}
      </div>
      {Boolean(isCat) && (
        <div>
          {cat.map(c => (
            <div key={c}>
              {c}
            </div>
          ))}
        </div>
      )}
      {Boolean(!isCat && desc) && (
        <div>
          {desc}
        </div>
      )}
      <div className={s.footer}>
        {Boolean(label) && (
          <div className={s.label}>
            {label}
          </div>
        )}
        {Boolean(link) && (
          <a className={s.link} href={link} target="_blank" rel="noopener noreferrer">
            link
          </a>
        )}
      </div>
    </div>
  );
};

Cat.propTypes = {
  desc: PropTypes.string,
  name: PropTypes.string.isRequired,
  cat: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  link: PropTypes.string,
};

Cat.defaultProps = {
  desc: null,
  cat: null,
  label: null,
  link: null,
};

export default Cat;
