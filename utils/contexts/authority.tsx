import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Spinner from "react-spinner-material";
import { useAuth } from "./auth-context";

export const Authority = ({ children }) => {
  const router = useRouter();
  const [authenticated, setAuth] = useState(false);

  const { token, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser === null) {
      router.push("/login");
    } else {
      setAuth(true);
    }
  }, []);
  if (!authenticated)
    return (
      <div className="h-screen w-screen">
        <div className="w-48 h-48 m-auto mt-48">
          <Spinner
            size={120}
            spinnerColor={"#333"}
            spinnerWidth={2}
            visible={true}
          />
        </div>
      </div>
    );
  return <div>{children}</div>;
};
