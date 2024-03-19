import CreatorCard from "@/components/shared/CreatorCard";
import { Loader } from "@/components/shared/Loader";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";


const AllUsers = () => {
  const { data: users, isError: isErrorUsers, isLoading: isUsersLoading }  = useGetUsers();

  console.log(users)

  if (isErrorUsers) {
    return (
      <div>
        <p className="body-medium text-light-1">
          Sorry, something went wrong
        </p>
      </div>
    )
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold">All Users</h2>
        {isUsersLoading && !users ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {users?.documents.map((user) => (
              <li key={user?.$id} className="flex-1 min-w-[210px] md:max-w-[250px] w-full">
                <CreatorCard
                  userProfileImg={user.imageUrl}
                  name={user.name}
                  username={user.username}
                />
              </li>
             ))}
          </ul>
        )}
      </div>
    </div>
  )
};

export default AllUsers