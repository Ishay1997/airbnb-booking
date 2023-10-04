import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { ImageService } from "../services/ImageService";
import PlacePreview from "../components/PlacePreview";
import { PlaceService } from "../services/PlaceService";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const places = await PlaceService.getPlaces();
      console.log('places',places)
      setPlaces(places); // Assuming res.data contains the places data
    } catch (error) {
      console.error(error);
      alert("Failed to load places");
    }
  }

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          to="/account/places/new"
          className="bg-primary inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div>
        {places.length > 0 &&
          places.map((place, index) => (
            <PlacePreview key={index} place={place} />
            /* <div key={index}>
              {place.title}
            </div> */
          ))}
      </div>
    </div>
  );
}
