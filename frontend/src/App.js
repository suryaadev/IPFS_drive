import "./App.css"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { conAddress, abi } from "./constants/index"
import FileUpload from "./components/FileUpload"
import Modal from "./components/Modal"

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  })

  const [account, setAccount] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  const connectWallet = async () => {
    const { ethereum } = window
    if (ethereum) {
      window.ethereum.on("chianChanged", () => {
        window.location.reload()
      })

      window.ethereum.on("accountsChanged", () => {
        window.location.reload()
      })

      const account = await ethereum.request({ method: "eth_requestAccounts" })
      const contractAddress = conAddress
      const contractABI = abi
      setAccount(account)
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      setState({ provider, signer, contract })
    } else {
      alert("Please connect to metamask")
    }
  }

  useEffect(() => {
    connectWallet()
  }, [])

  console.log(state)
  return (
    <div className="App">
      <h1 style={{ color: "white" }}>IPFS Drive</h1>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <p style={{ color: "white" }}>
        Account : {account ? account : "Please connect metamask"}
      </p>
      <FileUpload account={account} state={state} />
      <Modal />
    </div>
  )
}

export default App
