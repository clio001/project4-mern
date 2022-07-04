import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function useIsAuthorized() {
  const { userProfile } = useContext(AuthContext);
  const isAuthorized = userProfile ? true : false;
  return isAuthorized;
}

export default useIsAuthorized;
