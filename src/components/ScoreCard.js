import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { ShmonstersContext } from "./ShmonstersContext";

export default function ScoreCard(props) {
  const { wallet } = useContext(ShmonstersContext);
  return (
    <Card sx={{ maxWidth: 400 }} raised s>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <p> NFTs: {wallet.length} </p>
          <p> Monsters: {props.monsterCnt * wallet.length} </p>
        </Typography>
      </CardContent>
    </Card>
  );
}
