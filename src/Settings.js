import React from 'react';
//import { Grid, Row, Col } from 'react-bootstrap';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <a id="app-settings-group" className="btn btn-sm mt-2 app-settings-group-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ⚙
        </a>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="app-settings-group">
          <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); this.props.onChangeTheme(e)}}>
            {this.props.theme.charAt(0).toUpperCase() + this.props.theme.slice(1)} theme
          </a>
          <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); this.props.onChangeDatepicker(e)}}>
            Datepicker {this.props.inline}
          </a>
          {/*<div className="dropdown-divider"></div>
          <a className="dropdown-item" href="https://github.com/hsjoberg/whatwasbtc-client">
            Source-code at GitHub
          </a>
          */}
        </div>
      </div>);
  }
}

export default Settings;
