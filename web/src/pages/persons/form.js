const React = require('react')
const xhr = require('xhr')
const { Link, Redirect } = require('react-router')

const PersonForm = React.createClass({
  getInitialState: function(){
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      success: false
    }
  },
  componentDidMount(){
    if (this.props.params.id) {
      xhr.get('http://localhost:4000/persons/' +
      this.props.params.id, {json: true }, (err, res, person) => {
        if (err) return console.log(err.message)
        this.setState( person )
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
     xhr.put('http://localhost:4000/persons/' + this.state.id, {
       json: this.state
     }, (err, res, body) => {
         if (err) return console.log(err.message)
         this.setState({ success: true })
     })
   } else {
     xhr.post('http://localhost:4000/persons', {
       json: this.state
     }, (err, res, body) => {
         if (err) return console.log(err.message)
         this.setState({ success: true })
     })
   }
  },
  render(){
    const formState = this.state.id ? 'Edit' : 'New'
    return (
      <div>
        { this.state.success && this.state.id ?
          <Redirect to={`/persons/${this.state.id}/show`} />
          : null
        }
        { this.state.success && !this.state.id ?
          <Redirect to={`/persons`} />
          : null
        }
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
