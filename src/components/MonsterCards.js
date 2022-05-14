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
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="345"
        image={
          "https://bafybeigcjujjjshpxecnqlsxobkzv76njzfljvgpd7xu33qywfom7q3ybq.ipfs.dweb.link/" +
          props.nftId +
          ".png"
        }
        alt="green iguana"
        margin="5"
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
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
