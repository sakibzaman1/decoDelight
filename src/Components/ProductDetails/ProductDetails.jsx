import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';
import StarRatings from 'react-star-ratings';
import { AuthContext } from '../../Providers/AuthProvider';

const ProductDetails = () => {

    const { user } = useContext(AuthContext);
    const product = useLoaderData();
    console.log(product)

    const [rating, setRating] = useState(0); // State for storing the rating value
    // const [disabled, setDisabled] = useState(true)


    const handleReview = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const review = form.get("review");
        const productId = product?._id;
        const email = user?.email;
        const photo = user?.photoURL;
    
        const addedReview = {
          review: review,
          productId: productId,
          email: email,
          photo: photo,
          rating: rating, // Include the rating value
        };
    
        console.log(addedReview);
    
      
    
        fetch("https://deco-delight-server.vercel.app/reviews", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(addedReview),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            swal({
              position: "top-center",
              icon: "success",
              title: "Review Added",
              showConfirmButton: false,
              showCancelButton: false,
              timer: 2000,
            });
          });
      };
    

    return (
        <div className='pt-28 bg-cover bg-center lg:flex justify-center gap-48 py-10'  style={{ backgroundImage: 'url("https://i.ibb.co/SfY0ZZt/bg.jpg")' }}>
            <div className='lg:w-[50%] px-10'>
            <ProductCard key={product?._id} product={product}></ProductCard>
            </div>
            <div className='lg:w-[50%]'>
            <h2 className='mb-6'>
            <span className="text-xl">Ratings</span>
          </h2>
          <StarRatings
            rating={product?.rating}
            starRatedColor="orange"
            starDimension="40px"
            starSpacing="15px"
          />

<h1 className="my-6 text-start text-2xl">Your Opinion</h1>
              <form className="flex flex-col w-full" onSubmit={handleReview}>
                <textarea
                  disabled={!user}
                  title={!user ? "Please login" : ""} // Show tooltip if disabled
                  name="review"
                  placeholder="Write Something"
                  className="textarea h-28 textarea-bordered textarea-success w-full max-w-lg"
                ></textarea>
                {/* rating */}
                <div className="my-4 flex justify-start items-center gap-4 mt-6">
                  <h2 className="text-base ">Rate this product:</h2>
                  <StarRatings
                    rating={rating}
                    starRatedColor="yellow"
                    starHoverColor="yellow"
                    changeRating={(rate) => setRating(rate)}
                    numberOfStars={5}
                    name="rating"
                    starDimension="20px"
                    starSpacing="10px"
                  />
                </div>
                {/* reCAPTCHA */}
                <button disabled={!user} className="hover:scale-110 mt-6 transition duration-300 ease-in-out text-black bg-gradient-to-r from-transparent via-amber-300 to-transparent hover:via-amber-400 w-[50%] px-10">
                  Submit
                </button>
              </form>
            </div>
        </div>
    );
};

export default ProductDetails;