/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './index.css';
import AutosizeInput from 'react-input-autosize';
import cl from 'classnames';

class CMD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 'ls -la',
      isFocus: false,
    };
  }

  inputOnChange = e => this.setState({ input: e.target.value });

  render() {
    const { input, isFocus } = this.state;
    return (
      <div
        className="background"
      >
        <div className="cmd-container cmd">
          <div className="cmd-top-container">
            <span className="box" />
            <span className="box">
              Noe Rivals
            </span>
            <span className="box">
              <span className="cmd-button cmd-button-red" />
              <span className="cmd-button cmd-button-orange" />
              <span className="cmd-button cmd-button-green" />
            </span>
          </div>
          <div
            className="cmd-content-container"
            onClick={async () => { this.inputRef.focus(); this.setState({ isFocus: true }); }}
            onBlur={async () => { this.setState({ isFocus: false }); }}
          >
            <div className="cmd-content cmd-content-first">
              [noe@noe-pc ~]$
              <AutosizeInput
                ref={ref => { this.inputRef = ref; }}
                inputClassName="cmd-input"
                className="cmd-input-container"
                onChange={this.inputOnChange}
                value={input}
              />
              <span className={cl('input-carret', isFocus ? 'input-carret-focus' : 'input-carret-blur')} />
            </div>
            <div className="cmd-content">
              2
            </div>
            <div className="cmd-content">
              3
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CMD;
