import { useContext, useEffect } from "react";
import Header from "../Header";
import { AuthService } from "../services/AuthService";
import { UserContext } from "../UserContext";

export default function IndexPage() {
  const { ready, user, setUser } = useContext(UserContext);

  console.log('Index Page RENDER')
  return <div>index page here</div>;
}
