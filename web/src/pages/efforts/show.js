const React = require('react')
const xhr = require('xhr')
const { Link, Redirect } = require('react-router')
const R = require('ramda')

const Effort = React.createClass({
  getInitialState: function() {
    return {
      effort: {},
      people: [],
      removed: false
    }
  },
  componentDidMount() {
    this.props.get("efforts", this.props.params.id, (err, effort) => {
      if (err) return console.log(err.message)
      this.setState({effort})
    })
  },
  handleRemove(e) {
    e.preventDefault()
    if (confirm('Are you sure?')) {
      this.props.remove("efforts", this.props.params.id, this.state.effort, (err, body) => {
        if (err) return console.log(err.message)
        this.setState({removed: true})
      })
    }
  },
  removeMember (member) {
    console.log('remove')
    return (e) => {
      e.preventDefault()
      var array = []
      R.map(m => array.push(m), this.state.effort.team)
      for (var i=0; i < array.length; i++) {
        if (array[i].id === member.id) {
          array.splice(i, 1)
        }
      }
      console.log(this.state.effort.team)
      console.log(array)
      this.setState({team: array})
    }
  },
  render() {
    const teamMapping = member =>
      <li>
        {member.value}
        <button className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib hover-red" onClick={this.removeMember(member)}><span className="dark-red">X</span></button>
      </li>
    return (
      <div>
        { this.state.removed ? <Redirect to="/efforts"/> : null }
        <h1 className="helvetica gray fw1">{this.state.effort.name}</h1>
        <p><span className="green">Goal:</span> {this.state.effort.desc}</p>
        <p><span className="green">Start Date:</span>  {this.state.effort.start}</p>
        <p><span className="green">End Date:</span>  {this.state.effort.end}</p>
        <p><span className="green">Phase:</span>  {this.state.effort.phase}</p>
        <p><span className="green">Team:</span> </p>
        <ul>
          { (this.state.effort.team) ? this.state.effort.team.map(teamMapping) : null }
        </ul>
        <p><span className="green">Location:</span> { (this.state.effort.location) ? this.state.effort.location.value : null } </p>
        <div>
          <a className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver mr2 hover-blue" href="#0">
            <Link to={`/efforts/${this.state.effort.id}/edit`} className="no-underline gray hover-blue">Edit</Link></a>
          <a className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver mr2 hover-red" href="#0" onClick={this.handleRemove}>
            <span className="">Remove</span> </a>
          <a className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-green" href="#0">
            <Link to={"/efforts"} className="no-underline gray hover-green">Return</Link></a>
        </div>
      </div>
    )
  }
})

module.exports = Effort
