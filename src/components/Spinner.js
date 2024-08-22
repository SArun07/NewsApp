import React, { Component } from 'react'
import loading from './loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-3' src={loading} alt="loading" />
      </div>
    )
  }
}




// In Below function based component are There for Spinner



// import React from 'react'
// import loading from './loading.gif'

// const Spinner = () => {
//     return (
//       <div className='text-center'>
//         <img className='my-3' src={loading} alt="loading" />
//       </div>
//     )
// }
