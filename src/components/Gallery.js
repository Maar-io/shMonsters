import { React } from "react";
import { useContext } from "react";
import ScoreCard from "./ScoreCard";
import MonsterCards from "./MonsterCards";
import { Button } from "@mui/material";
import { ShmonstersContext } from "./ShmonstersContext";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  CenterFocusStrong,
  CenterFocusStrongOutlined,
} from "@mui/icons-material";

const SHMONSTERS_IPFS =
  "https://bafybeiezurc3dpn7wy6jkjotjuw5jcvmefnoqip2wivz5rkj3uzga6uzqu.ipfs.dweb.link/";

export default function Gallery(props) {

  const { wallet } = useContext(ShmonstersContext);
  console.log("walletSize", wallet.length);
  const addMonster = () => {
    console.log("addMonster called");
  };
  return (
    <>
    <Container maxWidth="md" component="score">
      <Grid container spacing={4} xs={12} alignItems="center" direction="column" style={{ minHeight: '30vh' }}>
        <Grid item>
          <ScoreCard monsterCnt={5} />
        </Grid>
      </Grid>
    </Container>
        <Divider />
    <Container maxWidth="md" component="gallery" >
      <Grid container spacing={4} >
        {wallet.map((nft) => (
          <Grid item xs={4} style={{minWidth: "250px"}}>
            <MonsterCards key={nft} nftId={nft} nftIpfs={SHMONSTERS_IPFS} nftContract={props.nftContract}/>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
}
