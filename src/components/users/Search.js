import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: "",
  };

  static propTypes = {
    text: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter something", "light");
    } else {
      this.props.searchUser(this.state.text);
      this.setState({ text: "" });
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="text"
          type="text"
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="User Search..."
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
    );
  }
}

export default Search;
