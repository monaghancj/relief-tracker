const React = require('react')
const Service = require('./components/service')

const Home = require('./pages/home')
const About = require('./pages/about')
const Persons = require('./pages/persons/index')
const Person = require('./pages/persons/show')
const PersonForm = require('./pages/persons/form')
const Efforts = require('./pages/efforts/index')
const Effort = require('./pages/efforts/show')
const EffortForm = require('./pages/efforts/form')

const { BrowserRouter, Match, Miss, Link } = require('react-router')

const NoMatch = (props) => (
  <div>
    <h1>Page Not Found</h1>
    <Link to="/">Home</Link>
  </div>
)

const App = React.createClass({
  render() {
    return (
      <BrowserRouter>
        <div>
          <Miss component={NoMatch} />
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/about" component={About} />
          <Match exactly pattern="/persons" component={Service(Persons)} />
          <Match pattern="/persons/:id/show" component={Service(Person)} />
          <Match pattern="/persons/:id/edit" component={PersonForm} />
          <Match exactly pattern="/persons/new" component={PersonForm} />
          <Match exactly pattern="/efforts" component={Service(Efforts)} />
          <Match pattern="/efforts/:id/show" component={Service(Effort)} />
          <Match exactly pattern="/efforts/new" component={EffortForm} />
          <Match pattern="/efforts/:id/edit" component={EffortForm} />

        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App
