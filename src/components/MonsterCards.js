import * as React from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MonsterCards(props) {

  const getMetadata = async () => {
    const nftLink = props.nftUrl + props.nftId + ".json";
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
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          ShMonster #{props.nftId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          text
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Monster</Button>
        <Button size="small">Shiden</Button>
        <Button size="small">Beauty</Button>
      </CardActions>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Sell</Button>
        <Button size="small">Like</Button>
      </CardActions>
    </Card>
  );
}
