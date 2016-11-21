const React = require('react')
const xhr = require('xhr')
const { Link, Redirect } = require('react-router')

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
  render() {

    return (
      <div>
        { this.state.removed ? <Redirect to="/efforts"/> : null }
        <h1>{this.state.effort.name}</h1>
        <p>Goal: {this.state.effort.desc}</p>
        <p>Start Date: {this.state.effort.start}</p>
        <p>End Date: {this.state.effort.end}</p>
        <p>Phase: {this.state.effort.phase}</p>
        <p>People: {JSON.stringify(this.state.people)}</p>
        <div>
          <a className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib black" href="#0">
            <Link to={`/efforts/${this.state.effort.id}/edit`}>Edit</Link></a>
          <a className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib black" href="#0" onClick={this.handleRemove}>
            Remove </a>
          <a className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib black" href="#0">
            <Link to={"/efforts"}>Return</Link></a>
        </div>
      </div>
    )
  }
})

module.exports = Effort
