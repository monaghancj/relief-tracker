const React = require('react')
const xhr = require('xhr')
const { Link, Redirect } = require('react-router')

const EffortForm = React.createClass({
  getInitialState: function(){
    return {
      name: '',
      phase: '',
      desc: '',
      start: '',
      end: '',
      organizationID: '',
      success: false
    }
  },
  componentDidMount(){
    if (this.props.params.id) {
      xhr.get('http://localhost:4000/efforts/' +
      this.props.params.id, {json: true }, (err, res, effort) => {
        if (err) return console.log(err.message)
        this.setState( effort )
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
   console.log('ID: ' + this.state.id)
   if (this.state.id) {
     xhr.put('http://localhost:4000/efforts/' + this.state.id, {
       json: this.state
     }, (err, res, body) => {
         if (err) return console.log(err.message)
         this.setState({ success: true })
     })
   } else {
     xhr.post('http://localhost:4000/efforts', {
       json: this.state
     }, (err, res, body) => {
         if (err) return console.log(err.message)
         this.setState({ success: true })
     })
   }
  },
  render() {
    return (
      <div>
        { this.state.success && this.state.id ?
          <Redirect to={`/efforts/${this.state.id}/show`} />
          : null
        }
        { this.state.success && !this.state.id ?
          <Redirect to={`/efforts`} />
          : null
        }
        <h3> New Relief Effort </h3>
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
            <label>Phase</label>
            <input
              onChange={this.handleChange('phase')}
              value={this.state.phase}
              type="text"
              name="phase"
            />
          </div>
          <div>
            <label>Description</label>
            <input
              onChange={this.handleChange('description')}
              value={this.state.description}
              type="text"
              name="description"
            />
          </div>
          <div>
            <label>Start</label>
            <input
              onChange={this.handleChange('start')}
              value={this.state.start}
              type="text"
              name="start"
            />
          </div>
          <div>
            <label>End</label>
            <input
              onChange={this.handleChange('end')}
              value={this.state.end}
              type="text"
              name="end"
            />
          </div>
          <div>
            <label>Organization ID</label>
            <input
              onChange={this.handleChange('organizationID')}
              value={this.state.organizationID}
              type="text"
              name="organizationID"
            />
          </div>
          <div>
            <button>Create Relief Effort</button>
            <Link to="/efforts"> Cancel </Link>
          </div>
        </form>

      </div>
    )
  }
})

module.exports = EffortForm
