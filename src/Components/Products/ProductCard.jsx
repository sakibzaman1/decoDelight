import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

const ProductCard = ({product}) => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);

    return (
        <div className="card bg-base-100 shadow-xl relative overflow-hidden" data-aos="zoom-in" data-aos-duration="2000">
  <div className="absolute inset-0 bg-cover bg-center filter blur-lg opacity-50 animate-zoom" style={{ backgroundImage: `url('${product?.image}')` }}></div>
  <figure className="px-10 pt-10 relative z-10">
    <img src={product?.image} alt="Shoes" className="rounded-t-lg h-40 w-80" />
  </figure>
  <div className="card-body items-center text-center relative z-10 bg-white bg-opacity-80 backdrop-blur-md">
    <h2 className="card-title">{product?.name}</h2>
    <p>{product?.description}</p>
    <h2>Price: $ <span className='text-red-600 font-bold font-mono text-3xl'>{product?.price}</span></h2>
    <div className="card-actions mt-10">
      <button className="hover:scale-110 transition duration-300 ease-in-out text-black bg-gradient-to-r from-transparent via-amber-300 to-transparent hover:via-amber-400 w-full px-10">Add to Cart</button>
    </div>
  </div>
</div>

    );
};

export default ProductCard;