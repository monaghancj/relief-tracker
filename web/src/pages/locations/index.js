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
        <Link className="no-underline link dim mid-gray" to={`/locations/${location.id}/show`}>
          {location.name}
        </Link>
      </li>
    return (
      <div>
        <h1 className="helvetica gray fw1 f-subheadline">Locations</h1>
        <Link className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib green" to="/locations/new"> New Location </Link>
        <ul>
          { this.state.locations.map(listLocations) }
        </ul>
        <Link className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver" to="/">Home</Link>
      </div>
    )
  }
})

module.exports = Locations
