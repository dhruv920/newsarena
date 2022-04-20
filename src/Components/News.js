import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country:'in',
        pageSize:8,
        category:'general'
    }

    static propTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }

    constructor(){
        super();
        console.log("this is a constructor");

        this.state = {
            articles : [],
            loading:true,
            page:1,
            totalResults:0
        }
    }

    async updateNews(){
        
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
       
        this.setState({
            page: this.state.page + 1,
            articles:parsedData.articles,
            loading:false
        })

    }


    async componentDidMount(){
        this.props.setProgress(10);
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        });
        
        this.props.setProgress(100);

    }

    handlePrevious = async ()=>{

        this.setState({page:this.state.page - 1})
        this.updateNews();
    }

    handleNext = async ()=>{
        
    this.setState({page:this.state.page + 1});
    this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({page:this.state.page + 1});
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles:this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,
        });
      };


  render() {
    return (
        <>
          <h1 className="text-center">NewsArena - Top Headlines</h1>
            {this.state.loading && <Spinner />} 
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<h4><Spinner /></h4>}
                >
        <div className="container my-3">
                <div className="row my-3">
                {this.state.articles.map((elemant)=>{
                        return <div className="col-md-4" key={elemant.url}>
                                    <NewsItem title={elemant.title} description={elemant.description} imageUrl={elemant.urlToImage} newUrl={elemant.url} author={elemant.author} source={elemant.source.name} date={elemant.publishedAt} />
                                </div>
                })}
                </div>
                {/* <div className="container  d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevious} >&larr;Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext} >Next &rarr;</button>
                </div> */}
                
        </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News
