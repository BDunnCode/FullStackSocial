import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
} from "@/components/ui/form"

import { ProfileValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";


const UpdateProfile = () => {
  


  const { user, setUser } = useUserContext();
  
  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  // Queries

  
  return (
    <div>UpdateProfile</div>
  )
}

export default UpdateProfile