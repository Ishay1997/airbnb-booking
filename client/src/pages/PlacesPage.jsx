import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState(""); // Define extraInfo state
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
function inputHeader(text){
    return(
        <h2 className="text-2xl mt-4">{text}</h2>
    );
}
function inputDescription(text){
    return (
        <p className="text-gray-500 text-sm">{text}</p>
    );
}
function preInput(header,description){
    return (
        <>
            {inputHeader(header)}
            {inputDescription(description)}

        </>
    );
}
    return(
        <div>
        {action !== 'new' && (        
            <div className="text-center">
            <Link to={'/account/places/new'} className = " bg-primary  inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new place
            </Link>
        </div>
        )}     


        {action === 'new' && (
            <div>
            <form>
            {preInput('Title','Title for your place.should be short and catchy as in advertisement')}

                 <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: my lovely apt"/>
            {preInput('Address','Address to this place')}
                 <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address"/>
            {preInput('photos','more = better')}
                 <div className="flex gap-2">
                 <input value={photoLink}
                 onChange={ev=>setPhotoLink(ev.target.value)}
                     type="text" placeholder={'Add using a link ... jpg'}/>
                    <button className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                 </div>
                 <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  <button className="flex justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
    </svg>
    Upload
  </button>
</div>
                 {preInput('Description','description of the place')}
<textarea  value={description} onChange={ev =>setDescription(ev.target.value)}/>
{preInput('Perks','select all the perks of your place')}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <Perks selected={perks} onChange={setPerks}/>
            </div>
            {preInput('Extra info','house rules, etc')}

            <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>
            {preInput('check in&out times','add check in and out times, remember to have some time window for cleaning the room between guests Address to this place')}
            <div className="grid gap-2 sm:grid-cols-3">
            <div>
            <h3 className="mt-2 -mb-1">check in time</h3>
            <input type="text" placeholder="14:00"/>
            </div>
            <div>
            <h3 className="mt-2 -mb-1">check out time</h3>
            <input type="text"/>
            </div>
            <div>
            <h3 className="mt-2 -mb-1">max number of guests</h3>
            <input type="text"/>
            </div>

            
            </div>
            <button className="primary my-4">Save</button>
            </form>
            </div>
        )}
        </div>
    );
}