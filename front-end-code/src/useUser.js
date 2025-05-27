import { useState,useEffect } from "react";
import { getAuth ,onAuthStateChanged } from "firebase/auth";

const useUser = () =>{
    const [isLoading,setIsLoading] = useState(true);
    const[user,setuser] =useState(null);

    useEffect(() =>{
      const unsubscribe = onAuthStateChanged(getAuth(),function(user){
            setuser(user);
            setIsLoading(false);
        });
        return unsubscribe;
    }, []);

    return {isLoading,user};
}

export default useUser;