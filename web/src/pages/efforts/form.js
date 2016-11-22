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
      location: {},
      locationLookUp: [],
      locationOptions: [],
      team: [],         //Members added through select
      teamOptions: [],  //Formatted team name first last for viewing in select
      teamLookUp: [],   //JSON formatted team as gotten in allDocs
      success: false
    }
  },

  componentDidMount(){
    if (this.props.params.id) {
      this.props.get(this.props.params.id, (err, effort) => {
        if (err) return console.log(err.message)
        this.setState( effort )
      })
    }
    this.props.allDocs("persons", (err, team) => {
      var array = []
      team.map(member => {
        var name = member.firstName + ' ' + member.lastName
        array.push({value: name, id:member.id, label: name})
      })
      this.setState({teamLookUp: team, teamOptions:array})
    })
    this.props.allDocs("locations", (err, locations) => {
      var array = []
      locations.map(local => {
        array.push({value: local.name, id:local.id, label: local.name})
      })
      this.setState({locationLookUp: locations, locationOptions:array})
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
    const handleSelectTeam = val => {
      var array = this.state.team
      array.push(val[0])
      this.setState({team:array})
    }
    const teamMapping = member =>
      <li>{member.value}</li>
    const handleSelectLocation = locationIn => {
      var location = locationIn[0]
      this.setState({location})
    }

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
        <h1 className="helvetica gray fw1"> New Relief Effort </h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label className="green">Name </label>
            <input
              className="br2 ba b--light-silver mb2"
              onChange={this.handleChange('name')}
              value={this.state.name}
              type="text"
              name="name"
            />
          </div>
          <div>
            <label className="green">Phase </label>
            <input
              className="br2 ba b--light-silver mb2"
              onChange={this.handleChange('phase')}
              value={this.state.phase}
              type="text"
              name="phase"
            />
          </div>
          <div>
            <label className="v-top green">Description </label>
            <textarea
              className="br2 ba b--light-silver mb2"
              onChange={this.handleChange('desc')}
              value={this.state.desc}
              type="text"
              name="desc"
            />
          </div>
          <div>
            <label className="green"> Start </label>
            <input
              className="br2 ba b--light-silver mb2"
              onChange={this.handleChange('start')}
              value={this.state.start}
              type="text"
              name="start"
            />
          </div>
          <div>
            <label className="green">End </label>
            <input
              className="br2 ba b--light-silver mb2"
              onChange={this.handleChange('end')}
              value={this.state.end}
              type="text"
              name="end"
            />
          </div>
          <div>
            <label className="green">Organization ID </label>
            <input
              className="br2 ba b--light-silver mb2"
              onChange={this.handleChange('organizationID')}
              value={this.state.organizationID}
              type="text"
              name="organizationID"
            />
          </div>
          <div className="bb b--green">
            <p className="green"> Team:</p>
            <ul>
              {this.state.team.map(teamMapping)}
            </ul>
            <Select
              className="br2 ba b--light-silver mb3"
              multi={true}
              name="team-members-select"
              value="Add-Member"
              options={this.state.teamOptions}
              onChange={handleSelectTeam}
            />
          </div>
          <div>
            <p className="green">Location: <span className="black">{this.state.location.value}</span></p>
            <Select
              className="br2 ba b--light-silver mb2"
              multi={true}
              name="location-select"
              value="Add-Location"
              options={this.state.locationOptions}
              onChange={handleSelectLocation}
            />
          </div>
          <div>
            <a onClick={this.handleSubmit} className="f6 grow link dim br-pill ba bw1 ph3 pv2 ma2 dib gray" href="#0">
              Submit Relief Effort</a>
            <Link to="/efforts"><a className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib gray" href="#0">
               Cancel </a></Link>
          </div>
        </form>

      </div>
    )
  }
})

module.exports = EffortForm
