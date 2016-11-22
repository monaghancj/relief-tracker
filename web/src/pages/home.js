const React = require('react')
const { Link } = require('react-router')

const Home = React.createClass({
  render(){
    return (
      <div>
        <h1 className="helvetica gray fw1 f-headline">Relief Tracker</h1>
        <ul>
          <li><Link to="/about" className="no-underline black">About</Link></li>
          <li><Link to="/persons" className="no-underline black">Persons</Link></li>
          <li><Link to="/efforts" className="no-underline black">Efforts</Link></li>
          <li><Link to="/locations" className="no-underline black">Locations</Link></li>
        </ul>
      </div>

    )
  }
})

module.exports = Home
