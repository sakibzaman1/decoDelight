import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [matchingProducts, setMatchingProducts] = useState([]);

  useEffect(() => {
    // Fetch movie data from MongoDB
    // You can use fetch or any library like axios to fetch data
    // For simplicity, I'm assuming you have a function called fetchMoviesFromMongoDB
    fetch(`https://deco-delight-server.vercel.app/products`)
        .then(res=> res.json())
        .then(data=> setProducts(data))
  }, []);

  useEffect(() => {
    // Filter movies based on search query
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setMatchingProducts(filteredProducts);
  }, [searchQuery, products]);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleLinkClick = () => {
    setSearchQuery(''); // Reset search query
  };


    return (
       
        <div className='hidden lg:flex justify-center items-center relative'>
      <input
        type="text"
        placeholder="Search"
        className="input bg-transparent text-black input-bordered border-2 w-24 md:w-auto lg:w-48 h-10 rounded-lg"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {searchQuery && (
        <div className="z-10 search-results rounded-b-xl absolute top-full left-0 bg-black bg-opacity-90 shadow-lg w-[180%]">
          {matchingProducts.map(product => (
            <Link to={`/products/${product?._id}`} onClick={handleLinkClick} key={product?._id}>
            <div className='flex space-y-8 items-center gap-2' >
                <img className='w-10 h-8' src={product?.image} alt="" />
                <p className='text-sm h-12'>{product?.name}</p>
                
                </div>
            </Link>
          ))}
        </div>
      )}
      <button className="btn btn-ghost btn-circle -ml-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
    </div>
    );
};

export default Search;