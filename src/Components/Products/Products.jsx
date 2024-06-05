import React, { useState, useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import ProductCard from './ProductCard';

const Products = ({ products }) => {
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    const toggleShowAll = () => {
        setShowAll(prevState => !prevState);
    };

    return (
        <div>
            <h1 className="text-5xl text-center mt-20 py-2 px-10 mb-10 bg-gradient-to-r from-transparent via-gray-300 to-transparent text-black" data-aos="fade-up" data-aos-delay="100" data-aos-duration="2000">
                <span className='p-4 shadow-sm'>Products We Offer</span>
            </h1>
            <div className='grid lg:grid-cols-4 grid-cols-1 lg:gap-6 px-6'>
                {
                    (showAll ? products : products?.slice(0, 8)).map(product => <ProductCard key={product.id} product={product} />)
                }
            </div>
            <button onClick={toggleShowAll} className="my-10 hover:scale-110 transition duration-300 ease-in-out text-black bg-gradient-to-r from-transparent via-amber-300 to-transparent hover:via-amber-400 w-60 flex justify-center lg:text-xl mx-auto text-center">
                {showAll ? "See Less" : "See All"}
            </button>
        </div>
    );
};

export default Products;
