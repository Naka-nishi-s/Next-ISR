import styles from "./page.module.css";

const getData = async () => {
  // データを取得
  const res = await fetch("https://jsonplaceholder.typicode.com/comments/1", {
    next: { revalidate: 5 },
  });
  const comment = await res.json();

  // 現在時刻を取得
  const currentTime = new Date().toLocaleString();

  // データと現在時刻を返却
  return { comment: comment, time: currentTime };
};

export default async function Home() {
  const data: {
    comment: {
      postId: number;
      id: number;
      name: string;
      email: string;
      body: string;
    };
    time: string;
  } = await getData();

  return (
    <main className={styles.main}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <p>ID: {data.comment.id}</p>
        <p>Email: {data.comment.email}</p>
        <p>Time: {data.time}</p>
      </div>
    </main>
  );
}
