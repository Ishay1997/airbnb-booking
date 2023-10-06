import { Link } from "react-router-dom";

export default function PlacePreview(props) {
  const { place } = props;

  return (
    <div className="mt-4">
    <Link to={'/account/places/'+place._id} className="flex">
      <div className="flex flex-col w-32 h-32 bg-gray-300">
        {place.photos.length > 0 && (
          <img
            src={`http://localhost:4000/uploads/${place.photos[0]}`}
            alt=""
            className="w-full h-20 object-cover"
          />
        )}
        
</div>
      <div className="go-0 shrink">
        <h2 className="text-xl">{place.title}</h2>
        <p className="text-sm mt-2">{place.description}</p>
      </div>
</Link>
</div>
  );
}
