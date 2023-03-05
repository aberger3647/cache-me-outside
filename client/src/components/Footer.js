import React, { useEffect, useState } from 'react';
import matchIcon from '../assets/matches-icon.svg';
import { useQuery } from '@apollo/client';
import { GET_IMAGE } from '../utils/queries';
import { Image } from "cloudinary-react";
import profileIcon from "../assets/profile-icon.svg";

function Footer() {
  const { loading, data } = useQuery(GET_IMAGE);
  console.log(data)
  const image = data?.me.image || "";

  const [imageId, setImageId] = useState("");

useEffect(() => {
  if (image) {
    setImageId(image)
  }
}, [image])

  return (
    <footer>
      <a href="/profile">
      {!imageId ? (
            <img
              src={profileIcon}
              alt="Profile icon"
            />
          ) : (
            <Image
              cloudName={process.env.REACT_APP_CLOUD_NAME}
              publicId={imageId}
            />
          )}
      </a>
      <h3><a href="/explore">explore</a></h3>
      <a href="/matches"><img src={matchIcon} alt="Matches Icon" /></a>
    </footer>
  );
}

export default Footer;

{/* <a href="/signup">Sign Up</a> | 
<a href="/login">Login</a> | 
<a href="/preferences">Preferences</a> | 
<a href="/explore">Explore</a> | 
<a href="/createprofile">Profile Form</a> | 
<a href="/details">Details</a> | 
<a href="/profile">Profile</a> | 
<a href="/upload">Upload</a> |  */}