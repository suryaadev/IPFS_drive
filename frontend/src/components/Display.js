import { useState } from "react"
import "./Display.css"

const Display = ({ contract, account }) => {
  const [data, setData] = useState("")

  const getData = async () => {
    let dataArray
    const otherAddress = document.querySelector(".address").value
    if (otherAddress) {
      dataArray = await contract.display(otherAddress)
      console.log(dataArray)
    } else {
      dataArray = await contract.display(account)
      console.log(dataArray)
    }
    const isEmpty = Object.keys(dataArray).length === 0
    if (!isEmpty) {
      const str = dataArray.toString()
      // console.log(str)
      const str_array = str.split(",")
      // console.log(str_array)

      const images = str_array.map((img, i) => {
        return (
          <a href={img} key={i} target="_blank">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${img.substring(6)}`}
              alt="new"
              className="image-list"
            />
          </a>
        )
      })
      setData(images)
    }
  }
  return (
    <>
      <div className="img-list">{data}</div>
      <input type="text" placeholder="Enter Address" className="address" />
      <button className="center button" onClick={getData}>
        See Img
      </button>
    </>
  )
}

export default Display
