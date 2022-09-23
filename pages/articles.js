import { Pagination, PaginationItem } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MediaCard from "../components/card";

import { getNews } from "../services/Articles.service";
import styles from "../styles/Articles.module.css";
export default function Articles({ news, length }) {
  const mediaCards = news.map(({ title, article, date, email, id }) => (
    <MediaCard key={id} article={article} title={title} date={date} email={email} />
  ));
  const router = useRouter();

  return (
    <>
      <h1>Articles</h1>
      {news.length ? <div>{mediaCards}</div> : <div>{"No articles ;("}</div>}

      {!!length && (
        <Pagination
          count={Math.ceil(length / 5)}
          variant="outlined"
          renderItem={(item) => {
            return (
              <PaginationItem
                {...item}
                selected={router.query.page == item.page && item.type == "page"}
                disabled={item.type !== "page" && (router.query.page == item.page || router.query.page - 1 == item.page)}
                onClick={() => {
                  router.push({
                    pathname: "/articles",
                    query: { page: +item.page },
                  });
                }}
              />
            );
          }}
        />
      )}
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const { query } = ctx;
    console.log(query);
    const { page } = query;
    const { news, length } = await getNews(page);
    return {
      props: {
        news,
        length,
      },
    };
  } catch (e) {
    console.log(e);
  }
};
