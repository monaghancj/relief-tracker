const React = require('react')
const { Link } = require('react-router')

const About = React.createClass({
  render() {
    return (
      <div>
        <h1 className="helvetica gray fw1">About this Relief Tracker</h1>
        <h2 className="helvetica green fw1">Relief Efforts</h2>
        <p>This relief tracker is designed to maintain Relief Efforts, the related persons and location where the Relief Effort is taking place. </p>
        <h2 className="helvetica green fw1">Full Stack Practice</h2>
        <p>This relief tracker is designed as a practice in implementing a full stack application using Javascript. You will find Node, React, Express, CouchDB & MySQL.
          The backend is designed around Data Access Layer and API in order to easily implement and maintain CouchDB and MySQL databases.</p>
        <Link className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver" to="/">Home</Link>
      </div>
    )
  }
})

module.exports = About
