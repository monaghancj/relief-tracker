const React = require('react')
const { Link } = require('react-router')


const Efforts = React.createClass({
  render(){
    return (
      <div>
        <h3>To Do: Efforts List</h3>
        <Link to="/">Home</Link>
      </div>

    )
  }
})

module.exports = Efforts
