import React from 'react';
import moment from 'moment';

import DateInput from './DateInput';
import Price from './Price';
import AppSettings from './Settings';
import History from './History';

 // IE Polyfills:
import 'string.prototype.startswith';
import 'url-polyfill';
Number.parseInt = parseInt;
Number.parseFloat = parseFloat;

const API_URL = "/";
const API_URL_PRICE = API_URL + "api/price/";

class App extends React.Component {
  constructor() {
    super();
    this.handleDateInputChange = this.handleDateInputChange.bind(this);
    this.getPrice = this.getPrice.bind(this);

    const url = new URL(window.location.href);

    const inline = url.searchParams.has('inline');

    let theme = 'light';
    if (url.searchParams.has('dark-theme') || url.searchParams.has('dark'))
      theme = 'dark';

    let currentDate = getCurrentDate();
    const testDate = url.pathname.substr(1,10);
    if (moment(testDate, 'YYYY-MM-DD', true).isValid()) {
      currentDate = testDate;
    }

    this.state = {
      date: currentDate,
      inline,
      theme: theme
    };

    (async () =>  {
      const price = await this.getPrice(currentDate);
      const newState = { ...this.state, price };
      super.setState(newState);

      History.setupHistoryState(newState);
      History.setupHistoryChange((changedState) => {
        super.setState(changedState);
      });
    })();
  }

  /**
   * Callback for DateInput
   * @param date Date retrieved
   */
  async handleDateInputChange(date) {
    // If the new date is valid
    if(moment(date, 'YYYY-MM-DD', true).isValid()) {
      const price = await this.getPrice(date);

      this.setState({...this.state, date, price });
     }
  }

  /**
   * Get the price for a date and update the state
   */
  async getPrice(date) {
    try {
        const priceInfo = await getPriceFromAPI(date);
      return priceInfo.price;
    }
    catch(e) {
      return false;
    }
  }

  /**
    Overload React's setState
    TODO don't overload
  */
  setState(state, cb = () => {}) {
    super.setState(state, cb);
    History.newPage(state);
  }

  render() {
    return (
      <div className={`container-fluid ${this.state.theme}-theme`} style={{height: '100vh'}}>
        <div className="row">
           <div className="col-2 offset-10 text-right">
            <div role="group">
              <AppSettings
                theme={this.state.theme}
                inline={this.state.inline ? 'inline' : 'dropdown'}
                onChangeTheme={() => this.setState({...this.state, theme: this.state.theme === "light" ? "dark" : "light"})}
                onChangeDatepicker={() => this.setState({...this.state, inline: !this.state.inline})}
              />
            </div>
          </div>
        </div>

        <div className="row align-items-center" style={{height: '65vh'}}>
          <div className="col-12 text-center">
            <Price price={this.state.price} currency={"$"} />
            <DateInput
              date={this.state.date}
              handleChange={this.handleDateInputChange}
              startDate={moment("2010-07-18")}
              endDate={moment()}
              inline={this.state.inline}
            />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Call the API to retrieve the price
 * @param string date ISO date
 * @throws
 * @return Promise
 */
async function getPriceFromAPI(date) {
  try {
    const result = await fetch(API_URL_PRICE + date);
    if (result.status === 500) {
      throw Error('Request failed');
    }
    const json = await result.json();

    let price = 0;
    if (json.price >= 100)
      price = Number.parseInt(json.price, 10);
    else if (json.price < 1)
      price = Number.parseFloat(json.price).toFixed(4);
    else
      price = Number.parseFloat(json.price).toFixed(2);

    return {
      price: price,
      date: json.date
    };
  }
  catch(e) {
    console.log(e);
    throw e;
  }
}

function getCurrentDate() {
  return (new Date()).toISOString().substring(0, 10);
}

export default App;
