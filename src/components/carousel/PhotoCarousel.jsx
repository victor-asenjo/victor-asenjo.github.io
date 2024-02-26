import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import profilephoto from "../../assets/images/profilephoto.png";
import orlaPhotoSquare from "../../assets/images/orlaPhotoSquare.jpg";
import refereeImage from "../../assets/images/refereeImage.jpg";
import profile2 from "../../assets/images/profile2.jpg";

const PhotoCarousel = () => {
  return (
    <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false}>
      <div>
        <img src={profilephoto} alt="Profile Photo" />
      </div>
      <div>
        <img src={orlaPhotoSquare} alt="Orla Photo" />
      </div>
      <div>
        <img src={refereeImage} alt="Referee Image" />
      </div>
      <div>
        <img src={profile2} alt="Profile 2" />
      </div>
    </Carousel>
  );
};

export default PhotoCarousel;
