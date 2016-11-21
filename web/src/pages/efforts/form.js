const React = require('react')
const xhr = require('xhr')
const { Link, Redirect } = require('react-router')
const Select = require('react-select')

const EffortForm = React.createClass({
  getInitialState: function(){
    return {
      name: '',
      phase: '',
      desc: '',
      start: '',
      end: '',
      organizationID: '',
      team: [],
      options: [],
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
    this.props.allDocs("persons", (err, team) => {
      var array = []
      team.map(member => {
        var name = member.firstName + ' ' + member.lastName
        array.push({value: member.firstName, label: name})
      })
      this.setState({team: team, options:array})
    })
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
              onChange={this.handleChange('desc')}
              value={this.state.desc}
              type="text"
              name="desc"
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
            {JSON.stringify(this.state.team)}

            <Select
              multi={true}
              name="form-field-name"
              value="Add Member"
              // options={[
              //     { value: 'one', label: 'One' },
              //     { value: 'two', label: 'Two' }
              // ]}
              options={this.state.options}
              onChange={val => console.log(val)}
            />
          </div>
          <div>
            <a onClick={this.handleSubmit} className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib black" href="#0">
              Create Relief Effort</a>
            <Link to="/efforts"><a className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib black" href="#0">
               Cancel </a></Link>
          </div>
        </form>

      </div>
    )
  }
})

module.exports = EffortForm
