import React, { useContext, useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import UseCart from '../../Hooks/UseCart';
import { useLocation, useNavigate } from 'react-router-dom';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { AuthContext } from '../../Providers/AuthProvider';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

const ProductCard = ({product}) => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);

      const {user} = useContext(AuthContext);;
    const axiosSecure = UseAxiosSecure();

    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = UseCart();

    const handleAddToCart = (product)=> {
      console.log('Clicked', user)
      if(user && user.email){
        // TODO:  Sent food info to database
        const cartItem = {
          productId : product?._id,
          email: user?.email,
          image: product?.image,
          price: product?.price,
          name: product?.name,
          rating: product?.rating,
          description: product?.description
        };
        console.log(product)
        axiosSecure.post('/carts', cartItem)
        .then(res=> {
          console.log(res.data);
          if(res.data.insertedId){
            swal({
              position: 'top-center',
              icon: 'success',
              title: 'Product Added Successfully',
              showConfirmButton: false,
              showCancelButton: false,
              timer: 2000
          });
          // refetch the cart
          refetch();
          }
        })
      }
      else{
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Please Sign In!"
        }).then((result) => {
          if (result.isConfirmed) {
           navigate('/signIn', {state:location.pathname});
          }
        });
      }
    }

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
      <button  onClick={()=> handleAddToCart(product)} className="hover:scale-110 transition duration-300 ease-in-out text-black bg-gradient-to-r from-transparent via-amber-300 to-transparent hover:via-amber-400 w-full px-10">Add to Cart</button>
    </div>
  </div>
</div>

    );
};

export default ProductCard;