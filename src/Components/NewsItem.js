import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,imageUrl,newsUrl,date,source,author} =  this.props;
    return (
      <div>
        <div className="card" >
            <img src={imageUrl} className="card-img-top" alt="..." />
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1',left:'90%'}}>
                {source}
                <span className="visually-hidden">unread messages</span>
              </span>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">by {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>

      </div>
    )
  }
}

export default NewsItem
