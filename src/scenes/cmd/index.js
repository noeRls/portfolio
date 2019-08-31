/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './index.css';
import AutosizeInput from 'react-input-autosize';
import cl from 'classnames';
import { getDirectory } from '../../services/directory';
import { getCmdError } from '../../services/cmdTools';
import commands from '../../services/commands';
import CmdShortcut from '../../component/CmdShortcut';

let unique = 0;

class CMD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      isFocus: false,
      typing: false,
      stack: [],
      wide: false,
      shortcutExpanded: false,
    };
  }

  componentDidMount() {
    window.handleCmd = this.handleCmd;
    // eslint-disable-next-line no-undef
    document.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-undef
    document.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = async e => {
    if (e.ctrlKey) {
      if (e.keyCode === 76) {
        e.preventDefault();
        await this.handleCmd('clear', '');
      }
      if (e.keyCode === 67) {
        const { input } = this.state;
        e.preventDefault();
        this.handleCmd('', `${input}^C`);
        this.setState({ input: '' });
      }
    }
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

  addToStack = (element) => new Promise((res) => {
    const { stack } = this.state;
    unique += 1;
    const finalElement = (
      <div className="cmd-content" key={unique}>
        {element}
      </div>
    );
    this.setState({ stack: [finalElement, ...stack] }, res);
  });

  getPrompt = () => `[noe@noe-pc ${getDirectory().name}]$`;

  executeCmd = (cmd) => {
    const error = getCmdError(cmd);
    if (error) {
      this.addToStack(<span>{error}</span>);
      return;
    }
    const [cmdName, ...args] = cmd.split(' ');
    if (cmdName === 'clear') {
      this.setState({ stack: [] });
    } else {
      const info = commands.find(c => c.name === cmdName);
      info.fct(getDirectory(), args, this.addToStack);
    }
  }

  handleCmd = async (input, inputToDisplay = null) => {
    const oldPrompt = this.getPrompt();
    await this.addToStack((
      <div>
        {oldPrompt}
        &nbsp;
        {inputToDisplay || input}
      </div>
    ));
    if (!input || input.length === 0) return;
    await this.executeCmd(input.toLowerCase());
    this.forceUpdate(); // TODO implement redux for path
  }

  handleCmdEvent = async e => {
    e.preventDefault();
    const { input } = this.state;
    this.setState({ input: '' });
    await this.handleCmd(input);
    this.setState({ input: '' });
  }

  toogleExpand = () => {
    const { shortcutExpanded } = this.state;
    this.setState({ shortcutExpanded: !shortcutExpanded });
  }

  render() {
    const {
      input, stack, wide, shortcutExpanded,
    } = this.state;
    return (
      <div
        className="background main-container"
      >
        <div className={cl('cmd-container cmd', wide && 'cmd-container-wide')}>
          <div className="cmd-top-container">
            <span className="box" />
            <span className="box">
              Noe Rivals
            </span>
            <span className="box">
              <span className="cmd-button cmd-button-red" />
              <span className="cmd-button cmd-button-orange" onClick={async () => this.setState({ wide: !wide })} />
              <span className="cmd-button cmd-button-green" onClick={this.toogleExpand} />
            </span>
          </div>
          <div
            className="cmd-content-container scrollbar"
            onClick={async () => { this.inputRef.focus(); this.setState({ isFocus: true }); }}
            onBlur={async () => { this.setState({ isFocus: false }); }}
          >
            <div className="cmd-content cmd-content-first">
              {this.getPrompt()}
              &nbsp;
              <form onSubmit={this.handleCmdEvent} className="input-form">
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
        <CmdShortcut
          expanded={shortcutExpanded}
          onExpand={this.toogleExpand}
          className="cmd-shortcut"
          handleCmd={this.handleCmd}
        />
      </div>
    );
  }
}

export default CMD;
