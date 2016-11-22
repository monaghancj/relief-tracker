const React = require('react')
const xhr = require('xhr')
const { Link, Redirect } = require('react-router')

const Location = React.createClass({
  getInitialState: function() {
    return {
      location: {},
      removed: false
    }
  },
  componentDidMount() {
    this.props.get("locations", this.props.params.id, (err, location) => {
      if (err) return console.log(err.message)
      this.setState({location})
    })
  },
  handleRemove(e) {
    e.preventDefault()
    if (confirm('Are you sure?')) {
      this.props.remove("locations", this.props.params.id, this.state.location, (err, body) => {
        if (err) return console.log(err.message)
        this.setState({removed: true})
      })
    }
  },
  render() {
    return (
      <div>
        { this.state.removed ? <Redirect to="/locations"/> : null }
        <h3>{this.state.location.name}</h3>
        <p><span className="green">Longitude:</span> {this.state.location.lng}</p>
        <p><span className="green">Latitude:</span> {this.state.location.lat}</p>
        <Link to={`/locations/${this.state.location.id}/edit`}> Edit </Link>
        <button onClick={this.handleRemove}>Remove </button>
        <Link to={"/locations"}>Return</Link>
      </div>
    )
  }
})

module.exports = Location
