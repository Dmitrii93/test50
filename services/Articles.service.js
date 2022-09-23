import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, addDoc, query, orderBy, limit, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBH3N1aT19AqzxTuT9knz4jqFNkTW3IiZo",
  appId: "1:653540359165:web:dafa8149726be6588c7794",
  projectId: "sport50-20dc2",
  storageBucket: "sport50-20dc2.appspot.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getNews = async (page) => {
  const tableRef = collection(db, "news");
  const to = page * 5;
  const from = page * 5 - 4;
  const queryRef = query(tableRef, where("id", "<=", to), where("id", ">=", from));
  const newsSnapshot = await getDocs(queryRef);

  const queryRef2 = query(tableRef, orderBy("id", "desc"), limit(1));
  const newsSnapshot2 = await getDocs(queryRef2);
  const art = newsSnapshot2.docs.map((doc) => doc.data());
  const lastIndex = art[0]?.id || 0;
  return { news: newsSnapshot.docs.map((doc) => doc.data()), length: lastIndex };
};

export const addArticle = async (article) => {
  const tableRef = collection(db, "news");
  const queryRef = query(tableRef, orderBy("id", "desc"), limit(1));
  const newsSnapshot = await getDocs(queryRef);
  const art = newsSnapshot.docs.map((doc) => doc.data());
  let id = art.length ? art[0].id + 1 : 1;
  article.id = id;
  return addDoc(tableRef, article);
};
