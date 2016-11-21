const React = require('react')
const { Link } = require('react-router')

const Locations = React.createClass({
  getInitialState: function() {
    return {
      locations: []
    }
  },
  componentDidMount() {
    this.props.allDocs("locations", (err, locations) => {
      if (err) return console.log(err.message)
      this.setState({locations})
    })
  },
  render() {
    const listLocations = location =>
      <li key={location.id}>
        <Link to={`/locations/${location.id}/show`}>
          {location.name}
        </Link>
      </li>
    return (
      <div>
        <h1>Locations</h1>
        <Link to="/locations/new"> New Location </Link>
        <ul>
          { this.state.locations.map(listLocations) }
        </ul>
        <Link to="/">Home</Link>
      </div>
    )
  }
})

module.exports = Locations
