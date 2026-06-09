import {createContext,useState,useEffect} from "react";
import {getMe} from "./services/auth.api.js";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
   const [user,setUser] = useState(null);
   const [loading,setLoading] = useState(true);

   useEffect(()=>{
       const getandsetUser = async () => {
           console.log("AuthProvider: Starting getandsetUser...");
           try {
               // Add a 5 second timeout to prevent hanging forever
               const timeoutPromise = new Promise((_, reject) => 
                   setTimeout(() => reject(new Error('Request timed out')), 5000)
               );
               
               console.log("AuthProvider: Calling getMe()...");
               // Race the API call against the timeout
               const data = await Promise.race([getMe(), timeoutPromise]);
               console.log("AuthProvider: getMe() resolved with data:", data);
               
               // Check if data is defined before accessing .user
               if (data && data.user) {
                   setUser(data.user);
               } else {
                   setUser(null);
               }
           } catch (error) {
               console.error("AuthProvider: Error during getandsetUser:", error);
               setUser(null);
           } finally {
               console.log("AuthProvider: Finally block executed. Setting loading to false.");
               // Always set loading to false, even if authentication fails
               setLoading(false);
           }
       };

       getandsetUser();
   }, []);

   return( 
    <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
        {children}
    </AuthContext.Provider>
   )
}