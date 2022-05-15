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
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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
      <Container maxWidth="md" component="gallery">
        <Grid
          container
          spacing={4}
          xs={6}
          alignItems="center"
          style={{ minHeight: "30vh" }}
        >
          <Grid item spacing={4}>
            <ScoreCard monsterCnt={5} />
          </Grid>
          <Grid item spacing={4}>
            <Card spacing={2} sx={{ maxWidth: 400 }} raised>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <p> ShidenPass </p>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container maxWidth="md" component="gallery">
        <Grid container spacing={4}>
          {wallet.map((nft) => (
            <Grid item xs={4} style={{ minWidth: "250px" }}>
              <MonsterCards
                key={nft}
                nftId={nft}
                nftIpfs={SHMONSTERS_IPFS}
                nftContract={props.nftContract}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
