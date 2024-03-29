import CreatorCard from "@/components/shared/CreatorCard";
import { Loader } from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";

import { useGetPosts, useGetTopUsers } from "@/lib/react-query/queriesAndMutations";

import { Models } from "appwrite";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { data: posts, fetchNextPage, hasNextPage, isFetching, isLoading: isPostLoading, isError: isErrorPosts } = useGetPosts();
  const { ref, inView } = useInView();
  const { data: topUsers, isLoading: isTopUsersLoading, isError: isErrorTopUsers } = useGetTopUsers();

  console.log(posts);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching]);

  if (isErrorPosts || isErrorTopUsers) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Sorry, something went wrong.</p>
        </div>
        <div className="top-creators-sidebar">
          <p className="body-medium text-light-1">Sorry, something went wrong.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          <ul className="flex flex-col flex-1 gap-9 w-full">
            {(posts?.pages || []).map((page) =>
              page?.documents.map((post: Models.Document) => (
                <li key={`${post.$id}`}>
                  <PostCard post={post}  />
                </li>
              ))
            )}
          </ul>
          {(isFetching || isPostLoading) && <Loader />}
        </div>
        {posts && <div ref={ref} />}
      </div>

      <div className="top-creators-sidebar">
        <h3 className="h3-bold">Top Creators</h3>
          <ul className="grid grid-cols-2 grid-rows-4 gap-4 py-4">
            { isTopUsersLoading ? <Loader /> :
            topUsers?.documents.map((user) => (
              <li key={user.accountId}>
                <CreatorCard 
                  userProfileImg={user.imageUrl}
                  name={user.name}
                  username={user.username}
                />
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
};

export default Home;
