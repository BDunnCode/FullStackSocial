import { getInfiniteSavedPosts } from "@/lib/appwrite/api";


export const Saved = () => {
   const savedPosts = getInfiniteSavedPosts({ pageParam: 0});

   console.log(savedPosts)
  
  return (
    <div>Saved</div>
  )
};

export default Saved