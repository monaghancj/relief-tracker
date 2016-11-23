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
        <h1 className="helvetica gray fw1">{this.state.location.name}</h1>
        <p><span className="green">Longitude:</span> {this.state.location.lng}</p>
        <p><span className="green">Latitude:</span> {this.state.location.lat}</p>
        <Link className="no-underline f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver" to={`/locations/${this.state.location.id}/edit`}> Edit </Link>
        <button className="no-underline f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver" onClick={this.handleRemove}>Remove </button>
        <Link className="no-underline f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver" to={"/locations"}>Return</Link>
      </div>
    )
  }
})

module.exports = Location
