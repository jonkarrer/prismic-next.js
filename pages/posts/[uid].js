import React from "react";
import Image from "next/image";
import { RichText } from "prismic-reactjs";
import Prismic from "@prismicio/client";

export const apiEndpoint = "https://nextblogjs.cdn.prismic.io/api/v2";
const Client = () => Prismic.client(apiEndpoint);

const Post = ({ post }) => {
  console.log(post);
  return (
    <div style={{ padding: "100px", display: "grid", placeItems: "center" }}>
      <Image
        alt="stock photo"
        src={post.data.image.url}
        height={200}
        width={300}
      />
      <h1>{post.data.title[0].text}</h1>

      <RichText render={post.data.rich_content} />
    </div>
  );
};

export async function getStaticProps({ params }) {
  const post = await Client().getByID(params.uid);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const docs = await Client().query(
    Prismic.Predicates.at("document.type", "blog_post"),
    { lang: "*" }
  );

  return {
    paths: docs.results.map((doc) => {
      return { params: { uid: doc.id } };
    }),
    fallback: false,
  };
}

export default Post;
