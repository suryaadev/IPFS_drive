import { useState, useEffect } from "react"
import axios from "axios"
import "./FileUpload.css"

const FileUpload = ({ account, state }) => {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("No Image Selected")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (file) {
      try {
        const formData = new FormData()
        formData.append("file", file)

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `44f3732ce42f24350a30`,
            pinata_secret_api_key: `fadbd65e5bc9b24b0fbdb255ccc9363ac5f0365eb65399e7f57e2d9276c02bf3`,
            "Content-Type": "multipart/form-data",
          },
        })

        const imgHash = `ipfs://${resFile.data.IpfsHash}`

        await state.contract.add(account, imgHash)
        alert("Image uploaded sucessfully !!!")
        setFileName("No Image selected")
        setFile(null)
      } catch (error) {
        alert("Unable to upload file to pinata")
        console.error(error)
      }
    }
  }

  const retriveFile = (e) => {
    const data = e.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(data)
    reader.onloadend = () => {
      setFile(data)
    }
    setFileName(data.name)
    e.preventDefault()
  }

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retriveFile}
        />
        <span className="textArea"> Image : {fileName}</span>
        <button type="submit" className="upload">
          Upload File
        </button>
      </form>
    </div>
  )
}

export default FileUpload
