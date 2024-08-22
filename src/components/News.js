import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: "5",
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    console.log("Hello I am a Constructor from News component");
    console.log(process.env.REACT_APP_NEWS_API?'Api Keys Always Hide from Backend - Server':'No');
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // This is another mothod
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({articles : parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false
    // })

    this.updateNews();
  }

  // handlePrevClip = async () => {
  //   // This is another mothod
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({loading: true});
  //   // let data = await fetch(url);
  //   // let parseData = await data.json();
  //   // console.log(parseData);
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles : parseData.articles,
  //   //   loading: false
  //   // })

  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  // handleNextClip = async () => {
  //   // This is another mothod
  //   //   if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   //   this.setState({loading: true});
  //   //   let data = await fetch(url);
  //   //   let parseData = await data.json();
  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles : parseData.articles,
  //   //     loading: false
  //   //   })
  //   // }

  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  fetchMoreData = async() => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 });
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      // loading: false,
    });
  };

  render() {
    return (
      <><div className="container">
        <h1 className="text-center my-4">
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Hedlines
        </h1>

        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          >
          <div className="container">

          <div className="row">
            {/* {!this.state.loading && this.state.articles.map((element)=>{ */}
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 50) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 85)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClip}>&laquo; Previous</button>
      <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClip}>Next &raquo;</button>
      </div> */}
      </div>
      </>
    );
  }
}

export default News;







// In Below function based component are There for News




// import React, { useEffect, useState } from "react";
// import NewsItem from "./NewsItem";
// import Spinner from "./Spinner";
// import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

// const News = () => {

//     const [articles,setArticles] = useState([])
//     const [loading,setLoading] = useState(true)
//     const [page,setPage] = useState(1)
//     const [totalResults,setTotalResults] = useState(0)
 
// const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };


// const updateNews = async () => {
//     props.setProgress(10);
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
//     setLoading(true);
//     let data = await fetch(url);
//     props.setProgress(30);
//     let parseData = await data.json();
//     props.setProgress(70);

//     setArticles(parseData.articles)
//     setTotalResults(parseData.totalResults)
//     setLoading(false)

//     console.log(parseData);
//     props.setProgress(100);
//   }


//   useEffect(()=>{
// document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
//     updateNews();
        // eslint-disable-next-line
//   },[])

// //   const handlePrevClip = async () => {
// //     setPage(page - 1 );
// //     updateNews();
// // };

// // const handleNextClip = async () => {
// //     setPage(page + 1 );
// //     updateNews();
// // };
 

//   const fetchMoreData = async() => {

//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page=1}&pageSize=${props.pageSize}`;
//     setPage(page + 1 );
//     let data = await fetch(url);
//     let parseData = await data.json();
//     console.log(parseData);
//     setArticles(articles.concat(parseData.articles))
//     setTotalResults(parseData.totalResults)
//   };

//     return (
//       <><div className="container">
//         <h1 className="text-center my-4" style={{marginTop: '90px'}}>
//           NewsMonkey - Top {capitalizeFirstLetter(props.category)}{" "}
//           Hedlines
//         </h1>

//         {loading && <Spinner/>}

//         <InfiniteScroll
//           dataLength={articles.length}
//           next={fetchMoreData}
//           hasMore={articles.length !== totalResults}
//           loader={<Spinner />}
//           >
//           <div className="container">

//           <div className="row">
//             {/* {!loading && articles.map((element)=>{ */}
//             {articles.map((element) => {
//               return (
//                 <div className="col-md-4" key={element.url}>
//                   <NewsItem
//                     title={element.title ? element.title.slice(0, 50) : ""}
//                     description={
//                       element.description
//                         ? element.description.slice(0, 85)
//                         : ""
//                     }
//                     imageUrl={element.urlToImage}
//                     newsUrl={element.url}
//                     author={element.author}
//                     date={element.publishedAt}
//                     source={element.source.name}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//           </div>
//         </InfiniteScroll>
//       </div>
//       </>
//     );
// }

// News.defaultProps = {
//     country: "in",
//     pageSize: "5",
//     category: "general",
//     apiKey: "0",
//   };
//   News.propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
//   };


// export default News;

