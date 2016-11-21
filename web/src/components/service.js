const React = require('react')
const xhr = require('xhr')
const API_URL = process.env.REACT_APP_API
const Service = Component => React.createClass({
  // allDocs(callback) {
  //   xhr.get(`${API_URL}/persons`, {json:true}, (err, response, body) => {
  //     callback(err, body)
  //   })
  // },
  allDocs(db, callback) {
    xhr.get(`${API_URL}/${db}`, {json:true}, (err, response, body) => {
      callback(err, body)
    })
  },
  get(db, id, callback) {
    xhr.get(`${API_URL}/${db}/${id}`,
      {json: true}, (err, response, body) => {
      callback(err, body)
    })
  },
  post(db, doc, callback) {
    xhr.post(`${API_URL}/${db}`, {json:doc}, (e,r,b) => {
      callback(e,b)
    })
  },
  put(db, id, doc, callback) {
    xhr.put(`${API_URL}/${db}/${id}`, {json:doc}, (e,r,b) => {
      callback(e,b)
    })
  },
  remove(db, id, body, callback) {
    xhr.del(`${API_URL}/${db}/${id}`, {json:body}, (e,r,b) => {
      callback(e,b)
    })
  },
  render() {
    return (
      <Component {...this.props}  /*... destructures and sends props */
        allDocs={this.allDocs}
        get={this.get}
        post={this.post}
        put={this.put}
        remove={this.remove}
      />
    );
  }
})

module.exports = Service
