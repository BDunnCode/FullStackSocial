import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Loader } from "@/components/shared/Loader";
import { Button } from "../ui/button"
import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut } = useSignOutAccountMutation();
  const navigate = useNavigate();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
  
  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-8">
        <Link to="/" className="flex gap-3 items-center ml-12 -mb-9 -mt-4">
          <img 
            src="/assets/images/zoosociallogoworkingtrimmed.png"
            alt="logo"
            width={120}
            height={120}
          />
        </Link>
        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`}
          className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className='h-14 w-14 rounded-full'
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3"> @{user.username}</p>
            </div>
          </Link>  
        )}

        <ul className="flex flex-col gap-4">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li key={link.label} className=
              {`leftsidebar-link group ${
                isActive && 'bg-primary-500' 
              }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className=
                    {`group-hover:invert-white ${isActive && 'invert-white'}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      
      <Button variant="ghost" className="shad-button_ghost"
            onClick={(e) => handleSignOut(e)}>
              <img src="/assets/icons/logout.svg" alt="logout" />
              <p className="small-medium lg:base-medium">Logout</p>
        </Button>

    </nav>
  )
}

export default LeftSidebar