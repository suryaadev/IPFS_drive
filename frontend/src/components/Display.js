import { useState } from "react"
import "./Display.css"

const Display = ({ contract, account }) => {
  const getdata = () => {}
  return (
    <>
      <div className="img-list">Img</div>
      <input type="text" placeholder="Enter Address" className="address" />
      <button className="center button" onClick={getData}>
        See Img
      </button>
    </>
  )
}

export default Display
