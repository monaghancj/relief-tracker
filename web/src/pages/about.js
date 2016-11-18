const React = require('react')
const { Link } = require('react-router')

const About = React.createClass({
  render() {
    return (
      <div>
        <h3>About Relief Tracker</h3>
        <Link to="/">Home</Link>
      </div>
    )
  }
})

module.exports = About
