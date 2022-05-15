import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import styles from "./metamask-auth.module.css";
import ShmonstersContext from "./components/ShmonstersContext";
import Gallery from "./components/Gallery";
import Button from "@mui/material/Button";
import { ERC721ABI as abi } from "./components/ERC721ABI";
import AppBar from "@mui/material/AppBar";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
    const dappUrl = "maar-io.github.io/shMonsters/";
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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
        <ThemeProvider theme={darkTheme}>
      <header className="App-header">
        <ShmonstersContext.Provider value={value}>
          <GlobalStyles
            styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
          />
          <CssBaseline />
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Toolbar sx={{ flexWrap: "wrap" }}>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                ShMonsters
              </Typography>
              <nav>
                <Link
                  variant="button"
                  color="text.primary"
                  href="#"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Features
                </Link>
                <Link
                  variant="button"
                  color="text.primary"
                  href="#"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Enterprise
                </Link>
                <Link
                  variant="button"
                  color="text.primary"
                  href="#"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Support
                </Link>
              </nav>
              {account === "" ? (
                <MetaMaskAuth
                  onAddressChanged={onAddressChanged}
                ></MetaMaskAuth>
              ) : (
                <>
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
            </Toolbar>
          </AppBar>
          <Gallery />
        </ShmonstersContext.Provider>
      </header>
      </ThemeProvider>

    </div>
  );
}

export default App;
