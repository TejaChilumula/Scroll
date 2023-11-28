import PostFeed from "@/components/posts/PostFeed"
import Header from "@/components/Header"
import Form from "@/components/Form"
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const {user, error, isLoading} = useUser();


  return (
    <>
      <Link href="/api/auth/login">Bunty</Link>;
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  )
}
