const React = require('react')

const Home = require('./pages/home')
const About = require('./pages/about')
const Persons = require('./pages/persons/index')
const Efforts = require('./pages/efforts/index')

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
          <Match exactly pattern="/about" component={About} />
          <Match exactly pattern="/persons" component={Persons} />
          <Match exactly pattern="/efforts" component={Efforts} />
          {/* <Match exactly pattern="/locations" component={Locations} /> */}

        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App
