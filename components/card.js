import * as React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";
import styles from "../styles/Card.module.css";

export default function MediaCard({ title, article, date, email }) {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 3 }}>
      <CardHeader subheader={`Posted on ${date}`} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography style={{ wordWrap: "break-word" }} variant="body2" color="text.secondary">
          {article}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" marginTop={3}>
          Author's email:
          <a className={styles.link} href={`mailto:${email}`}>
            {email}
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
}
