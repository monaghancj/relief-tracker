const React = require('react')
const xhr = require('xhr')
const { Link, Redirect } = require('react-router')

const LocationForm = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      lat: '',
      lng: '',
      success: false
    };
  },
  componentDidMount(){
    if (this.props.params.id) {
      xhr.get('http://localhost:4000/locations/' +
      this.props.params.id, {json: true }, (err, res, location) => {
        if (err) return console.log(err.message)
        this.setState( location )
      })
    }
  },
  handleChange(field) {
    return e => {
      const newState = {}
      newState[field] = e.target.value
      this.setState(newState)
    }
  },
  handleSubmit(e) {
   e.preventDefault()
   if (this.state.id) {
     xhr.put('http://localhost:4000/locations/' + this.state.id, {
       json: this.state
     }, (err, res, body) => {
         if (err) return console.log(err.message)
         this.setState({ success: true })
     })
   } else {
     xhr.post('http://localhost:4000/locations', {
       json: this.state
     }, (err, res, body) => {
         if (err) return console.log(err.message)
         this.setState({ success: true })
     })
   }
  },
  render(){
    return (
      <div>
        { this.state.success && this.state.id ?
          <Redirect to={`/locations/${this.state.id}/show`} />
          : null
        }
        { this.state.success && !this.state.id ?
          <Redirect to={`/locations`} />
          : null
        }
        <h3> Location Form </h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name</label>
            <input
              onChange={this.handleChange('name')}
              value={this.state.name}
              type="text"
              name="name"
            />
          </div>
          <div>
            <label>Latitude</label>
            <input
              onChange={this.handleChange('lat')}
              value={this.state.lat}
              type="text"
              name="lat"
            />
          </div>
          <div>
            <label>Longitude</label>
            <input
              onChange={this.handleChange('lng')}
              value={this.state.lng}
              type="text"
              name="lng"
            />
          </div>
          <div>
            <button>Create Location</button>
            <Link to="/locations"> Cancel </Link>
          </div>
          {JSON.stringify(this.state)}
        </form>
      </div>
    )
  }
})

module.exports = LocationForm
