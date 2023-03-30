import { createContext, useEffect, useState } from "react";

const AuthContext: any = createContext({});

export const AuthProvider: any = ({ children }: any) => {
  const [auth, setAuth]: any = useState({});

  // useEffect(()=>{
  //  setAuth({role:localStorage.getItem('token')})
  // },[])
   //console.log(auth,"so this is auth");
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
