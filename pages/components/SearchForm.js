//Craig Hogan x00075734

//imports
import React, { Component } from "react";



export default class SearchForm extends Component 
{
  constructor(props) {
    super(props);
    this.state = {};
  }

  formSubmitted = event => 
  {
    //validate input
    if (event.target.newsSource.value != "") 
    {
      this.props.setNewsSource(event.target.newsSource.value);
    }
    event.preventDefault();
  };

//render form
  render() 
  {
    return (
      <div>
        <div id="search">
          <h4>Enter newsapi.org source</h4>
          <form onSubmit={this.formSubmitted}>
            <input
              name="newsSource"
              placeholder="e.g. abc-news, cnbc etc."
              type="text"
            />
            <button>Update News</button>
          </form>
        </div>
      </div>
    );
  }
}