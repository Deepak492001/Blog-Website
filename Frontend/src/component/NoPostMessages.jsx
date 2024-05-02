import React from 'react'
import "../CSS/NoPostMessage.css"
import sorry from "../assets/sorry.png"
const NoPostMessages = () => {
  return (
  <div className="sorry-container">
    <img className="sorry-img" src={sorry} alt="img" loading='lazy' />
    <h1 className="sorry-message">Sorry, No Posts Available</h1>
</div>

  )
}

export default NoPostMessages