import { React } from "react";
import { useContext } from "react";
import ScoreCard from "./ScoreCard";
import MonsterCards from "./MonsterCards";
import { Button } from "@mui/material";
import { ShmonstersContext } from "./ShmonstersContext";

const SHMONSTERS_URL =
  "https://bafybeiezurc3dpn7wy6jkjotjuw5jcvmefnoqip2wivz5rkj3uzga6uzqu.ipfs.dweb.link/";

export default function Gallery(props) {
  const { wallet } = useContext(ShmonstersContext);
  console.log("walletSize", wallet.length);
  const addMonster = () => {
    console.log("addMonster called");
  };
  return (
    <>
      <ScoreCard monsterCnt={5} />
      {wallet.map((nft) => (
        <MonsterCards key={nft} nftId={nft} nftUrl={SHMONSTERS_URL} />
      ))}
      <Button variant="contained" onClick={addMonster}>
        {" "}
        Add Monster {wallet.length}
      </Button>
    </>
  );
}
