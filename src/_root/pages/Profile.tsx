import { useUserContext } from "@/context/AuthContext";
import { Link, useLocation, useParams } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { getCurrentUserPostsById, getUserById } from "@/lib/appwrite/api";


const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const userPosts = getCurrentUserPostsById(user.id);
  const currentUser = getUserById(id || "");
  const location = useLocation();

  // console.log("location variable contents", location);
  // console.log("params which happen to be userid", id);
  // console.log("the user from useUserContext()", user);
  // console.log("the posts created by the user", userPosts);
  // console.log("the return from getUserByID, using the params", currentUser);

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <img 
          className="rounded-full"
          src={user.imageUrl} // Add or placeholder image
          alt="image"
          height={100}
          width={100}
        />
        <div className="flex flex-col">
          <div className="flex">
            <h2 className="h3-bold md:h2-bold w-full">{user.name}</h2>
            <Link to={`/update-profile/${user.id}`}>
              <img 
                src="/assets/icons/edit.svg"
                width={36}
                height={36}
                alt="edit"
                className="invert-white"
              />
            </Link>
          </div>
          <p className="text-[12px] text-light-3">@{user.username}</p>
          <div className="flex gap-10">
            <div>
              <p className="text-primary-500">100</p>
              <p>posts</p>
            </div>
            <div>
              <p className="text-primary-500">100</p>
              <p>liked posts</p>
            </div>
            <div>
              <p className="text-primary-500">100</p>
              <p>saved posts</p>
            </div>
          </div>
        </div>
      </div>
      <div>
          <Tabs>
            <TabsList>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              posts
            </TabsContent>
            <TabsContent value="liked">
              liked
            </TabsContent>
          </Tabs>
        </div>
    </div>
  )
}

export default Profile;