import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ margin: "10px" }}>
          <div style={{
            display:'flex',
            justifyContent:'flex-end',
            position:'absolute',
            right:'0'
          }}>
          <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
        {/* <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:1}}>{source}</span> */}
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Artemis-2-647x363.jpeg?2HQfzLZ8t8LIfv7rULqZLYSQUWL8mY1M"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                by {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;




// In Below function based component are There for NewsItem



// import React from "react";

// const NewsItem = (props) => {
//     let { title, description, imageUrl, newsUrl, author, date, source } = props;
//     return (
//       <div className="my-3">
//         <div className="card" style={{ margin: "10px" }}>
//           <div style={{
//             display:'flex',
//             justifyContent:'flex-end',
//             position:'absolute',
//             right:'0'
//           }}>
//           <span className="badge rounded-pill bg-danger">{source}</span>
//           </div>
//         {/* <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:1}}>{source}</span> */}
//           <img
//             src={
//               imageUrl
//                 ? imageUrl
//                 : "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Artemis-2-647x363.jpeg?2HQfzLZ8t8LIfv7rULqZLYSQUWL8mY1M"
//             }
//             className="card-img-top"
//             alt="..."
//           />
//           <div className="card-body">
//             <h5 className="card-title">
//               {title}...</h5>
//             <p className="card-text">{description}...</p>
//             <p className="card-text">
//               <small className="text-muted">
//                 by {!author ? "Unknown" : author} on{" "}
//                 {new Date(date).toGMTString()}
//               </small>
//             </p>
//             <a
//               rel="noreferrer"
//               href={newsUrl}
//               target="_blank"
//               className="btn btn-sm btn-dark"
//             >
//               Read More
//             </a>
//           </div>
//         </div>
//       </div>
//     );
// }

// export default NewsItem;

