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
        <Link className="no-underline link dim mid-gray" to={`/efforts/${effort.id}/show`}>
          {effort.organizationID}
        </Link>
      </li>
    return (
      <div>
        <h1 className="helvetica gray fw1 f-subheadline">Efforts List</h1>
          <Link className="no-underline f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver ma1" to="/efforts/new"> <span className="green">New Effort</span></Link>
          <ul>
            { this.state.efforts.map(listEfforts) }
          </ul>
        <Link className="no-underline f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver ma1" to="/">Home</Link>
      </div>
    )
  }
})

module.exports = Efforts
