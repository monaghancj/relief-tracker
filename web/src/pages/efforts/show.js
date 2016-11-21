const React = require('react')
const xhr = require('xhr')
const { Link, Redirect } = require('react-router')

const Effort = React.createClass({
  getInitialState: function() {
    return {
      effort: {},
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
        <h1>Effort Here</h1>
        <h3>{this.state.effort.name}</h3>
        <p>{this.state.effort.desc}</p>
        <p>{this.state.effort.start}</p>
        <p>{this.state.effort.end}</p>
        <p>{this.state.effort.phase}</p>
        <p>{this.state.effort.id}</p>
        <Link to={`/efforts/${this.state.effort.id}/edit`}>Edit</Link>
        <button onClick={this.handleRemove}>Remove </button>
        <Link to={"/efforts"}>Return</Link>
      </div>
    )
  }
})

module.exports = Effort
