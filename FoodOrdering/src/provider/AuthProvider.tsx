import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
  session: Session | null;
  profile: any;
  loading: boolean;
  isAdmin: boolean;
};
const AuthContex = createContext<AuthData>({ 
  session: null,
   loading: true,
   profile: null,
   isAdmin: false
   });
export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      
      setSession(session);
      setLoading(false);
     if (session) {
  // fetch profile
 

let { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', session.user.id)
  .single()
  console.log(data)
setProfile(data || null)          

}

     
    };
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
 
  console.log("Profile",profile?.group,session?.user.id)
  if(profile)
    return (
      <AuthContex.Provider value={{ session, loading,profile,isAdmin:profile?.group==='ADMIN'}}>
        {children}
      </AuthContex.Provider>
    );
  
  
}

export const useAuth = () => useContext(AuthContex);
