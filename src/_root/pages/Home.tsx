import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetPosts, useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { data: initialPosts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts();

  const { data: newPosts, fetchNextPage, hasNextPage } = useGetPosts()
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      console.log(inView)
      fetchNextPage()
    }
  }, [inView])

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home 
          Feed</h2>
          {isPostLoading && !initialPosts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {initialPosts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption}/>
              ))}
            </ul>
          )}
        </div>
        <div ref={ref}>
          <Loader />
        </div>

      </div>

    </div>
  )
}

export default Home