const React = require('react')
const { Link } = require('react-router')

const Home = React.createClass({
  render(){
    return (
      <div>
        <h1 className="helvetica gray fw1 f-headline">Relief Tracker</h1>
        <Link to="/about" className="no-underline f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver ma1"><span className="green">About</span></Link>
        <Link to="/persons" className="no-underline f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver ma1"><span className="green">Persons</span></Link>
        <Link to="/efforts" className="no-underline f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver ma1"><span className="green">Efforts</span></Link>
        <Link to="/locations" className="no-underline f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver ma1"><span className="green">Locations</span></Link>
      </div>

    )
  }
})

module.exports = Home
