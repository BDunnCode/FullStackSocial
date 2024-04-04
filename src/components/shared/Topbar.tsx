import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { INITIAL_USER, useUserContext } from "@/context/AuthContext";

const TopBar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccountMutation();
  const navigate = useNavigate();
  const { user, setUser, setIsAuthenticated, } = useUserContext();

  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    signOut();     
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  useEffect( () => {
    if (isSuccess) navigate(0);
  }, [isSuccess])

  return (
    <section className="topbar">
      <div className="flex-between">
        <Link to="/" className="flex gap-3 items-center">
          <img 
            src="/assets/images/zoosocialleftsidebarlogo.png"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>

        <div className="flex gap-4 pr-5">
          <Button variant="ghost" className="shad-button_ghost"
          onClick={(e) => handleSignOut(e)}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img 
              src={user.imageUrl || '/assets/icons/default-avatar.png'} 
              alt="profile"
              className='h-8 w-8 rounded-full'                
            />
          </Link>
        </div>
      </div>
    </section>
    )
}

export default TopBar