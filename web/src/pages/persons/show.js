const React = require('react')
const xhr = require('xhr')
const { Link, Redirect } = require('react-router')

const Person = React.createClass({
  getInitialState: function() {
    return {
      person: {},
      removed: false
    }
  },
  componentDidMount() {
    this.props.get("persons", this.props.params.id, (err, person) => {
      if (err) return console.log(err.message)
      this.setState({person})
    })
    // xhr.get('http://localhost:4000/persons/' + this.props.params.id,
    // { json: true },
    // (err, response, person) => {
    //   if (err) return console.log(err.message)
    //   this.setState({person})
    // }
    // )
  },
  handleRemove(e){
    e.preventDefault()
    if (confirm('Are you sure?')) {
      this.props.remove("persons", this.props.params.id, this.state.person, (err, body) => {
        if (err) return console.log(err.message)
        this.setState({removed: true})
      })
      // xhr.del('http://127.0.0.1:4000/persons/' + this.state.person.id, {
      //   json: this.state.person
      // }, (err, response, body) => {
      //   if (err) return console.log(err.message)
      //   this.setState({removed: true})
      // })
    }
  },
  render(){
    return (
      <div>
        { this.state.removed ? <Redirect to="/persons"/> : null }
        <h1 className="helvetica gray fw1"> {this.state.person.firstName + ' ' + this.state.person.lastName} </h1>
        <p><span className="green">Email: </span>{this.state.person.email}</p>
        <p><span className="green">Phone: </span>{this.state.person.phone}</p>
        <Link className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver" to={`/persons/${this.state.person.id}/edit`}>Edit</Link>
        <button className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver" onClick={this.handleRemove}>Remove </button>
        <Link className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver" to={"/persons"}>Return</Link>
      </div>
    )
  }
})

module.exports = Person
