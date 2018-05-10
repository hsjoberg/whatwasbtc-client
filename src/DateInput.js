import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import './style/datepicker/datepicker.css';

class DateInput extends Component {
  render() {
    let classes = [];

    if (this.props.inline)
      classes.push("datepicker-container--inline");

    return (
      <div id="datepicker-container" className={classes}>
        <DatePicker
          selected={moment(this.props.date)}
          inline={this.props.inline}

          dateFormatCalendar="MMMM YYYY"
          dateFormat={this.props.inline ? "YYYY-MM-DD" : "YYYY-MM-DD"}
          minDate={this.props.startDate}
          maxDate={this.props.endDate}
          scrollableYearDropdown
          showYearDropdown
          showMonthDropdown
          usShortMonthInDropdown
          disabledKeyboardNavigation
          onChange={(date) => {
            if (moment(date, 'YYYY-MM-DD', true).isValid())
              this.props.handleChange(date.format("YYYY-MM-DD"))
          }}

          popperPlacement="bottom-start"
          popperModifiers={{
            offset: {
              enabled: true,
              offset: '5px, 5px'
            },
            preventOverflow: {
              enabled: true,
              escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
              boundariesElement: 'viewport'
            }
          }}
        />
      </div>
    );
  }
}

// ▾

DateInput.propTypes = {
  inline: PropTypes.bool
};

DateInput.defaultProps = {
  inline: false
};

export default DateInput;
