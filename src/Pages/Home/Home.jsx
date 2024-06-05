import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Products from '../../Components/Products/Products';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const products = useLoaderData();

    return (
        <div>
           <section>
            <Banner></Banner>
           </section>
           <section>
            <Products products={products}></Products>
           </section>
        </div>
    );
};

export default Home;