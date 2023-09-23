import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }
  if (!ready) {
    return 'loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  function linkClasses(type = null) {
    let classes = 'py-2 px-6 text-black rounded-full';
    if (type === subpage) {
      classes += ' bg-primary';
    }
    return classes;
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <nav className="text-black flex justify-center mt-8 gap-2 mb-8">
        <Link className={linkClasses('profile')} to={'/account'}>
          my profile
        </Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>
          my bookings
        </Link>
        <Link className={linkClasses('places')} to={'/account/places'}>
          my accommodations
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
}
