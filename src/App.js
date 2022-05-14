import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import styles from "./metamask-auth.module.css";
import ShmonstersContext from "./components/ShmonstersContext";
import Gallery from "./components/Gallery";
import Button from "@mui/material/Button";
import { ERC721ABI as abi } from "./components/ERC721ABI";

const SHM_CONTRACT = "0x406bC9Fd7D3Bfcb6b0d102FdE21BFF7E5E9F2b9A";

function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

// called when the user clicks the “Connect to MetaMask” button
async function connect(onConnected) {
  if (!window.ethereum) {
    alert("Install MetaMask!");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  onConnected(accounts[0]);
}

// checked when the page loads the first time
async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }

    if (isMobileDevice()) {
      await connect(onConnected);
    }
  }
}

function MetaMaskAuth({ onAddressChanged }) {
  const [userAddress, setUserAddress] = useState("");
  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  useEffect(() => {
    onAddressChanged(userAddress);
  }, [userAddress]);

  return userAddress ? (
    <div>
      Connected with <Address userAddress={userAddress} />
    </div>
  ) : (
    <Connect setUserAddress={setUserAddress} />
  );
}

function Connect({ setUserAddress }) {
  if (isMobileDevice()) {
    const dappUrl = "metamask-auth.ilamanov.repl.co"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
      <a href={metamaskAppDeepLink}>
        <button className={styles.button}>Connect to MetaMask</button>
      </a>
    );
  }

  return (
    <button className={styles.button} onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </button>
  );
}

function Address({ userAddress }) {
  return (
    <span className={styles.address}>
      {userAddress.substring(0, 5)}…
      {userAddress.substring(userAddress.length - 4)}
    </span>
  );
}

function App() {
  const [wallet, setShmWallet] = useState([]);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [chainId, setChainId] = useState("");

  const value = { wallet, setShmWallet };

  const onAddressChanged = (newAddress) => {
    console.log("onAddressChanged in App", newAddress);
    setAccount(newAddress);
    queryWalletOfOwner();
  };

  async function queryWalletOfOwner() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20 = new ethers.Contract(SHM_CONTRACT, abi, provider);

      const result = await erc20.walletOfOwner(account);
      console.log("walletOfOwner", result);
      const nftArray = result.map((nft) => nft.toString());
      console.log("nftArray", nftArray);
      setShmWallet(nftArray);
    } catch (err) {
      console.log("Ohhhh nooo!");
      console.log(err);
    }
  }

  useEffect(() => {
    if (!account || !ethers.utils.isAddress(account)) return;
    if (!window.ethereum) return;
    queryWalletOfOwner();
  }, [account]);

  const onClickDisconnect = () => {
    console.log("onClickDisConnect");
    setBalance(undefined);
    setAccount(undefined);
  };

  // useEffect(() => {
  //   if (!account || !ethers.utils.isAddress(account)) return;
  //   //client side code
  //   if (!window.ethereum) return;
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   provider.getBalance(account).then((result) => {
  //     console.log("setBalance", ethers.utils.formatEther(result));
  //     setBalance(ethers.utils.formatEther(result));
  //   });
  //   provider.getNetwork().then((result) => {
  //     console.log("chain is", result.chainId);
  //     setChainId(result.name);
  //   });
  // }, [account]);


  return (
    <div className="App">
      <header className="App-header">
        <ShmonstersContext.Provider value={value}>
          {account === "" ? (
            <MetaMaskAuth onAddressChanged={onAddressChanged}></MetaMaskAuth>
          ) : (
            <>
              <Gallery />
              <Button
                variant="contained"
                onClick={() => {
                  console.log("logout");
                  setAccount("");
                }}
              >
                {" "}
                Logout
              </Button>
            </>
          )}
        </ShmonstersContext.Provider>
      </header>
    </div>
  );
}

export default App;
