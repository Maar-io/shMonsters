import * as React from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import TwitterIcon from "@mui/icons-material/Twitter";
import SellIcon from "@mui/icons-material/Sell";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import { CardHeader, Tooltip } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export default function MonsterCards(props) {
  const getMetadata = async () => {
    const nftLink = props.nftIpfs + props.nftId + ".json";
    try {
      let response = await fetch(nftLink);
      let responseJson = await response.json();
      return await responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const metadata = await getMetadata();
      console.log(metadata.name);
    })();
  });
  return (
    <Card sx={{ maxWidth: 400 }} raised>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          ShMonster #{props.nftId}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="250"
        image={
          "https://bafybeigcjujjjshpxecnqlsxobkzv76njzfljvgpd7xu33qywfom7q3ybq.ipfs.dweb.link/" +
          props.nftId +
          ".png"
        }
        title={props.nftId}
        alt="Shmonster nft image"
        margin="4"
      />
      <CardActions>
        <Grid container>
          <Grid item xs={3}>
            <Tooltip title="Call your followers to Like this NFT">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <TwitterIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Tooltip title="Sell on NFT marketplace">
              <IconButton
                href={
                  "https://tofunft.com/nft/shiden/" +
                  props.nftContract +
                  "/" +
                  props.nftId
                }
                target="_blank"
                color="success"
                aria-label="upload picture"
                component="span"
              >
                <SellIcon size="large" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Tooltip title="Edit on-chain text to be displayed with this NFT">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <AutoFixHighIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Tooltip title="Load the NFT with love">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          text
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container sx={{ color: "text.primary" }}>
          <Grid item xs={4}>
            5<img src="favicon.ico" alt="logo" height="30" />
          </Grid>

          <Grid item xs={4}>
            9<img src="shiden.png" alt="logo" height="30" />
          </Grid>
          {/* <Grid item xs={4}>
            <Button size="small">Beauty</Button>
          </Grid> */}
        </Grid>
      </CardActions>
    </Card>
  );
}
