const React = require('react')
const xhr = require('xhr')
const { Link, Redirect } = require('react-router')

const PersonForm = React.createClass({
  getInitialState: function(){
    return {
      firstName: 'Rick',
      lastName: 'Sanchez',
      email: 'rick&morty@cc.com',
      phone: '8907128904',
      success: false
    }
  },
  componentDidMount(){

  },
  handleChange(field) {
    return e => {
      const newState = {}
      newState[field] = e.target.value
      this.setState(newState)
    }
  },
  handleSubmit(e){
    e.preventDefault()
    xhr.post('http://localhost:4000/persons', {
      json: this.state
    }, (err, resonse, body) => {
      if (err) return console.log(err.message)
      this.setState({ success: true })
    })
  },
  render(){
    return (
      <div>
        { this.state.success ? <Redirect to="/persons" /> : null }
        <h3> New Person Form </h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>First Name </label>
            <input
              onChange={this.handleChange('firstName')}
              value={this.state.firstName}
              type="text"
              name="firstName"
            />
          </div>
          <div>
            <label>Last Name </label>
            <input
              onChange={this.handleChange('lastName')}
              value={this.state.lastName}
              type="text"
              name="lastName"
            />
          </div>
          <div>
            <label>Email </label>
            <input
              onChange={this.handleChange('email')}
              value={this.state.email}
              type="text"
              name="email"
            />
          </div>
          <div>
            <label>Phone </label>
            <input
              onChange={this.handleChange('phone')}
              value={this.state.phone}
              type="text"
              name="phone"
            />
          </div>
          <div>
            <button>Create Person</button>
            <Link to="/persons"> Cancel </Link>
          </div>
        </form>
      </div>
    )
  }
})

module.exports = PersonForm
