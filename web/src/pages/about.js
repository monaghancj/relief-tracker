const React = require('react')
const { Link } = require('react-router')

const About = React.createClass({
  render() {
    return (
      <div>
        <h1>About this Relief Tracker</h1>
        <h3>Relief Efforts</h3>
        <p>This relief tracker is designed to maintain Relief Efforts, the related persons and location where the Relief Effort is taking place. </p>
        <h3>Full Stack Practice</h3>
        <p>This relief tracker is designed as a practice in implementing a full stack application using Javascript. You will find Node, React, Express, CouchDB & MySQL.
          The backend is designed around Data Access Layer and API in order to easily implement and maintain CouchDB and MySQL databases.</p> 
        <Link to="/">Home</Link>
      </div>
    )
  }
})

module.exports = About
