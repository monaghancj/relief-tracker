const React = require('react')
const { Link } = require('react-router')

const Efforts = React.createClass({
  getInitialState: function(){
    return {
      efforts: []
    }
  },
  componentDidMount() {
    this.props.allDocs("efforts", (err, efforts) => {
      if (err) return console.log(err.message)
      this.setState({efforts})
    })
  },
  render(){
    const listEfforts = effort =>
      <li key={effort.id}>
        <Link to={`/efforts/${effort.id}/show`}>
          {effort.organizationID}
        </Link>
      </li>
    return (
      <div>
        <h3>Efforts List</h3>
          <Link to="/efforts/new"> New Effort </Link>
          <ul>
            { this.state.efforts.map(listEfforts) }
          </ul>
        <Link to="/">Home</Link>
      </div>

    )
  }
})

module.exports = Efforts
