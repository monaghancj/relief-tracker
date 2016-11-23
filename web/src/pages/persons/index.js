const React = require('react')
const { Link } = require('react-router')

const Persons = React.createClass({
  getInitialState: function(){
    return {
      persons: []
    }
  },
  componentDidMount() {
    this.props.allDocs("persons", (err, persons) => {
      if (err) return console.log(err.message)
      this.setState({persons})
    })
  },
  render(){
    const listPerson = person =>
      <li key={person.id}>
        <Link className="no-underline link dim mid-gray" to={`/persons/${person.id}/show`}>
          { person.firstName + ' ' + person.lastName }
        </Link>
      </li>
    return (
      <div>
        <h3 className="helvetica gray fw1 f-subheadline">Persons List</h3>
        <Link className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver" to="/persons/new"> New Person </Link>
        <ul>
          { this.state.persons.map(listPerson) }
        </ul>
        <Link className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver" to="/">Home</Link>
      </div>

    )
  }
})

module.exports = Persons
