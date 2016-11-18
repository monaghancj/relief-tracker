const React = require('react')
const Home = require('./pages/home')
const About = require('./pages/about')

const { BrowserRouter, Link, Match } = require('react-router')

const App = React.createClass({
  render() {
    return (
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={Home} />
          <Match exactly pattern="/about" component={About} />

        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App
