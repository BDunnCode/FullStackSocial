import GridPostList from "@/components/shared/GridPostList";
import { Loader } from "@/components/shared/Loader";
import { useGetInfiniteSavedPosts } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";


export const Saved = () => {
  // For getting infinite posts
  const { ref, inView } = useInView();
  const { data: savedPosts, fetchNextPage, hasNextPage, isFetching, isLoading, isError: isErrorSavedPosts } = useGetInfiniteSavedPosts();

  useEffect(() => {
    if(inView) {
      fetchNextPage();
    }
  }, [inView]); 

  if (isErrorSavedPosts) {
    return (
        <div className="common-container">
          <p className="body-medium text-light-1">Sorry, something went wrong.</p>
        </div>
    )
  };

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img 
            src="/assets/icons/saved.svg" 
            width={36}
            height={36}
            alt="saved" 
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
        </div>
        {savedPosts?.pages.map((item, index) => (
          item ? (
          <GridPostList key={`page-${index}`} posts={item.documents} />
          ) : null
        ))}
      </div>

      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  )
};

export default Saved