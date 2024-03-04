import { Button } from "../ui/button"

type CreatorCardProps = {
  userprofileimg: string,
  name: string,
  username: string,
}


const CreatorCard = ({userprofileimg, name, username}: CreatorCardProps) => {
  return (
    <div className="user-card">
      <div className="flex flex-col items-center px-4 gap-2">
        <img 
          src={userprofileimg}
          height={50}
          width={50}  
          className="rounded-full"    
        />
        <div className="flex flex-col gap-1 items-center">
          <h4 className="font-bold">{name}</h4>
          <p className="text-[12px] text-light-3">@{username}</p>
        </div>
        <Button
          variant="default"
          size="sm"
          className="shad-button_primary px-5"     
        >
          Follow
        </Button>
      </div>
    </div>
  )
}

export default CreatorCard