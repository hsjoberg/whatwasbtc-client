export default History = {
  setupHistoryState :(state, newStateCallback) => {
    // Setup the initial state
    window.history.replaceState(state, "", document.location.href);
  },

  setupHistoryChange : (newStateCallback) => {
    window.onpopstate = (event) => {
      console.log("New state", event.state);
      newStateCallback(event.state);
    };
  },

  /**
    state The new state
    setState React setState function
  */
  newPage : (state, setState) => {
    window.history.pushState(state, "", History.generateStateURL(state));
  },

  generateStateURL : (state) => {
    let url = "/";
    let querystring = [];

    url += state.date;
    if (state.inline === true) {
      querystring.push("inline");
    }
    if (state.theme && state.theme === "dark") {
      querystring.push(state.theme);
    }

    if(querystring.length > 0) {
      url += "?";
      url += querystring.join("&");
    }
    return url;
  }
};
