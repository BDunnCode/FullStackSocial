import { useParams } from "react-router-dom";

const Profile = () => {
  const x = useParams();

  console.log(x);

  return (
    <div className="profile-container">
    </div>
  )
}

export default Profile