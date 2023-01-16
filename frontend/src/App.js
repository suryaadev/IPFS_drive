import "./App.css"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { conAddress, abi } from "./constants/index"
import FileUpload from "./components/FileUpload"
import Modal from "./components/Modal"

function App() {
  const [account, setAccount] = useState("")
  const [contract, setContract] = useState(null)
  const [provider, setProvider] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload()
        })

        window.ethereum.on("accountsChanged", () => {
          window.location.reload()
        })

        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setAccount(address)
        let contractAddress = conAddress

        const contract = new ethers.Contract(contractAddress, abi, signer)
        setContract(contract)
        setProvider(provider)
      } else {
        console.error("Metamask is not installed")
      }
    }
    provider && loadProvider()
  }, [])
console.log(contract)
  return (
    <div className="App">
      <h1 style={{ color: "white" }}>IPFS Drive</h1>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <p style={{ color: "white" }}>
        Account : {account ? account : "Please connect metamask"}
      </p>
      <FileUpload account={account} contract={contract} provider={provider} />
      <Modal />
    </div>
  )
}

export default App
