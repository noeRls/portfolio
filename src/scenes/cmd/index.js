/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './index.css';
import AutosizeInput from 'react-input-autosize';
import cl from 'classnames';
import { getDirectory } from '../../services/directory';
import { getCmdError } from '../../services/cmdTools';
import commands from '../../services/commands';

let unique = 0;

class CMD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 'ls -la',
      isFocus: false,
      typing: false,
      stack: [],
    };
  }

  getCarpetClassName = () => {
    const { isFocus, typing } = this.state;
    let special = '';
    if (isFocus) {
      special = typing ? 'input-carret-focus-typing' : 'input-carret-focus-ide';
    } else {
      special = 'input-carret-blur';
    }
    return cl(special, 'input-carret');
  }

  inputOnChange = e => {
    this.setState({ input: e.target.value, typing: true });
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => this.setState({ typing: false }), 1000);
  }

  addToStack = (element) => {
    const { stack } = this.state;
    unique += 1;
    const finalElement = (
      <div className="cmd-content" key={unique}>
        {element}
      </div>
    );
    this.setState({ stack: [finalElement, ...stack] });
  }

  getPrompt = () => `[noe@noe-pc ${getDirectory().name}]$`;

  executeCmd = (cmd) => {
    const error = getCmdError(cmd);
    if (error) {
      this.addToStack(<span>{error}</span>);
      return;
    }
    const [cmdName, ...args] = cmd.split(' ');
    const info = commands.find(c => c.name === cmdName);
    info.fct(getDirectory(), args, this.addToStack);
  }

  handleCmd = e => {
    e.preventDefault();
    const oldPrompt = this.getPrompt();
    const { input } = this.state;
    this.setState({ input: '' });
    this.addToStack((
      <div>
        {oldPrompt}
        &nbsp;&nbsp;
        {input}
      </div>
    ));
    if (input && input.length > 1) this.executeCmd(input);
  }

  render() {
    const { input, stack } = this.state;
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
              {this.getPrompt()}
              &nbsp;&nbsp;
              <form onSubmit={this.handleCmd} className="input-form">
                <AutosizeInput
                  ref={ref => { this.inputRef = ref; }}
                  inputClassName="cmd-input"
                  onChange={this.inputOnChange}
                  value={input}
                />
                <span className={this.getCarpetClassName()} />
              </form>
            </div>
            {stack}
          </div>
        </div>
      </div>
    );
  }
}

export default CMD;
