import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import matchIcon from "../assets/matches-icon.svg";
import { useQuery } from "@apollo/client";
import { GET_IMAGE } from "../utils/queries";
import { Image, Transformation } from "cloudinary-react";
import profileIcon from "../assets/profile-icon.svg";
import exploreIcon from "../assets/magheart.svg";
import auth from '../utils/auth';

function Footer() {

  const { loading, data } = useQuery(GET_IMAGE);

  const image = data?.me.image || "";
  const [imageId, setImageId] = useState("");
  const [path, setPath] = useState('');

  useEffect(() => {
    if (image) {
      let newImage = `${image}.png`;
      setImageId(newImage);
    }
  }, [image]);

  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/createprofile" ||
      location.pathname === "/preferences" ||
      location.pathname === "/editprofile" || 
      location.pathname === "/editpreferences"
    ) {
      setPath(location.pathname);
      document.body.style.margin = 0;
    } else {
      setPath("");
    }

  }, [location.pathname]);

  return (
    <>
      {!path ? (
        <footer id="footer">
          <div className='footerLinks'>
            <a href="/profile">
              {!imageId ? (
                <img src={profileIcon} alt="Profile icon" />
              ) : (
                <Image
                  cloudName={process.env.REACT_APP_CLOUD_NAME}
                  publicId={imageId}
                  alt="Prof Pic"
                >
                  <Transformation
                    width="150"
                    height="150"
                    gravity="face"
                    radius="max"
                    crop="fill"
                    border="8px_solid_white"
                  />
                </Image>
              )}
            </a>

            <a href="/explore">
              <img src={exploreIcon} alt="Explore Icon" />
            </a>

            <a href="/matches">
              <img src={matchIcon} alt="Matches Icon" />
            </a>
          </div>
        </footer>
      ) : (
        <></>
      )}
    </>
  );
}

export default Footer;

{
  /* <a href="/signup">Sign Up</a> | 
<a href="/login">Login</a> | 
<a href="/preferences">Preferences</a> | 
<a href="/explore">Explore</a> | 
<a href="/createprofile">Profile Form</a> | 
<a href="/details">Details</a> | 
<a href="/profile">Profile</a> | 
<a href="/upload">Upload</a> |  */
}
