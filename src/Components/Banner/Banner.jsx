import React, { useEffect } from 'react';
import bannerVideo from '../../assets/videos/homeDecor.mp4'
// import AOS from "aos";
// import "aos/dist/aos.css";
import { IoArrowRedo } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './banner.css'

const Banner = () => {
    // useEffect(() => {
    //     AOS.init();
    //     AOS.refresh();
    //   }, []);



    useEffect(() => {
        // Get the video element by class name
        const video = document.querySelector('.banner-video');
    
        // Set the playback speed to 0.5 (half the normal speed)
        video.playbackRate = 0.9;
      }, []); // Empty dependency array ensures the effect runs only once after the initial render

    return (
        <div>
              <div className="relative">
        {/* Video */}
        <div className="video-container">
        <video autoPlay loop muted className="opacity-100 w-full banner-video">
            <source src={bannerVideo} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
    </div>
      
       <div className="absolute top-20 lg:top-36 left-0 w-full h-full flex justify-start pl-6 lg:pl-10 gap-10">
    {/* Name div */}
    <div className="text-black ">
      <h1 className='lg:text-7xl text-xl font-bold text-white lg:pb-8 pb-4'  >Bringing Elegance</h1>
      <p className='lg:text-3xl text-base text-amber-500 font-semibold' >to Every Corner</p>
      <p className='text-gray-100 text-xs hidden lg:flex lg:text-lg w-[40%] py-2 lg:py-10 italic' >Explore our diverse range of home decor items designed to bring both beauty and comfort to your living spaces. Shop now and turn your house into a home you'll love.</p>
      {/* Button Div */}
    <div className="flex justify-start pt-10 gap-4 items-center" >
                    <IoArrowRedo size={40} color="white"></IoArrowRedo>
                    <Link to=""><button className="text-xs lg:text-base rounded-sm w-24 lg:w-28 h-full hover:scale-110  bg-gradient-to-r from-amber-600 to-amber-950 hover:bg-[#403F3F] text-white font-semibold hover:text-white py-2  border-2 border-none hover:border-transparent  transition duration-300 ease-in-out">Shop Now</button></Link> 

                    </div>
    </div>
  </div>
      </div>
        </div>
        
    );
};

export default Banner;