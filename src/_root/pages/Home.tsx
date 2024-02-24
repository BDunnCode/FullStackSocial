import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { data: posts, fetchNextPage, hasNextPage, isFetching } = useGetPosts();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching]);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          <ul className="flex flex-col flex-1 gap-9 w-full">
            {(posts?.pages || []).map((page, pageIndex) =>
              page?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={`page-${pageIndex}-${post.id}`} />
              ))
            )}
          </ul>
          {isFetching && <Loader />}
        </div>
        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default Home;
