import { TextField, Button, Alert } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { addArticle } from "../services/Articles.service";
import styles from "../styles/Article.module.css";

export default function Article() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [article, setArticle] = useState("");
  const [date, setDate] = useState(formatDate(Date.now()));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleOnChange = (e, setter) => {
    setter(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (title && email && article && date) {
      addArticle({ title, email, article, date });
      setTitle("");
      setEmail("");
      setArticle("");
      setIsSubmitted(false);
      setDate(formatDate(Date.now()));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  return (
    <>
      <h1>Writing an article</h1>
      <form onSubmit={handleOnSubmit}>
        <div className={styles.row}>
          <TextField
            value={title}
            id="title"
            label="Article's title"
            variant="outlined"
            error={isSubmitted && !title.length ? true : false}
            helperText={isSubmitted && !title.length ? "This field is required" : ""}
            onChange={(e) => handleOnChange(e, setTitle)}
          />
          <div className={styles.ml}>
            <TextField
              value={email}
              helperText={isSubmitted && !email.length ? "This field is required" : ""}
              id="email"
              label="Author's email"
              variant="outlined"
              error={isSubmitted && !email.length ? true : false}
              onChange={(e) => handleOnChange(e, setEmail)}
            />
          </div>
        </div>
        <div className={styles.row}>
          <TextField
            value={article}
            error={isSubmitted && !article.length ? true : false}
            helperText={isSubmitted && !article.length ? "This field is required" : ""}
            multiline
            fullWidth
            label="Your Article"
            id="body"
            minRows={2}
            maxRows={60}
            onChange={(e) => handleOnChange(e, setArticle)}
          />
        </div>
        <div className={styles.row}>
          <TextField
            id="date"
            label="Publication date"
            type="date"
            value={date}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            error={isSubmitted && !date.length ? true : false}
            onChange={(e) => handleOnChange(e, setDate)}
          />
          <div className={`${styles.ml} ${styles.centered}`}>
            <Button type="submit" variant="contained" color="success">
              Success
            </Button>
          </div>
          <div className={`${styles.ml} ${success ? styles.visible : styles.hidden}`}>
            <Alert severity="success">Article has been published</Alert>
          </div>
        </div>
      </form>
    </>
  );
}
