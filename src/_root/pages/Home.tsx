import CreatorCard from "@/components/shared/CreatorCard";
import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetPosts, useGetTopUsers } from "@/lib/react-query/queriesAndMutations";


import { Models } from "appwrite";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { data: posts, fetchNextPage, hasNextPage, isFetching } = useGetPosts();
  const { ref, inView } = useInView();
  const {data: topUsers, isLoading, isError} = useGetTopUsers();

  console.log(topUsers)


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

      <div className="hidden xl:flex flex-col py-5 px-4 bg-dark-2 overflow-y-scroll">
        <h3 className="h3-bold">Top Creators</h3>
        <div className="grid grid-cols-2 grid-rows-4 gap-4 py-4">
          {topUsers?.documents.map((user) => (
            <CreatorCard 
              key={user.accountId}
              userprofileimg={user.imageUrl}
              name={user.name}
              username={user.username}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
