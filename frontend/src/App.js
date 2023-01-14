import "./App.css"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { conAddress, abi } from "./constants/index"
import FileUpload from "./components/FileUpload"

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  })

  const [account, setAccount] = useState("")

  const connectWallet = async () => {
    const { ethereum } = window
    if (ethereum) {
      const account = await ethereum.request({ method: "eth_requestAccounts" })
      const contractAddress = conAddress
      const contractABI = abi
      setAccount(account)
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      setState({ provider, signer, contract })
    }
  }

  useEffect(() => {
    connectWallet()
  }, [])
  

  console.log(state)
  return <div className="App">
    <h1>{account}</h1>
  </div>
}

export default App
