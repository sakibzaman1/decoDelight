import React from "react";

import { MdOutlineDeleteSweep } from "react-icons/md";


import { Link } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseCart from "../../Hooks/UseCart";
import swal from "sweetalert";

const Cart = () => {
    const [cart, refetch] = UseCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const axiosSecure = UseAxiosSecure();

  const handleDelete = _id => {
    swal({
        title: "Please Confirm!",
        text: "Are you sure to delete?",
        icon: "warning",
        dangerMode: true,
      })
      .then(isConfirmed => {
        if (isConfirmed) {
            axiosSecure.delete(`/carts/${_id}`)
            .then(res=> {
                if(res.data.deletedCount > 0){
                    refetch();
                    swal('Deleted Successfully')
                }
            })
         console.log('deleted')
        } else{
          swal("Not deleted");

        }
      });
  }

  return (
    <div className="px-20 py-28 bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://c4.wallpaperflare.com/wallpaper/992/950/442/white-gray-gradation-blur-wallpaper-preview.jpg")' }}>
      <div>
        <div className="overflow-x-auto mb-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <h2 className="text-3xl">Total Orders : {cart.length}</h2>
                </th>
                <th></th>
                <th>
                  <h2 className="text-3xl">Total Price : {totalPrice}</h2>
                </th>
                <th>
                  <Link to=""><button className="btn">Pay</button></Link>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className="bg-transparent text-white text-xl">
              <th></th>
              <th>Product Image</th>
              <th>Product Name </th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id} item={item}>
                <td>{index+1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.image} />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm opacity-50"></div>
                    </div>
                  </div>
                </td>

                <td>{item.price}</td>
                <th>
                  <button onClick={()=> handleDelete(item._id)} className="btn btn-ghost btn-xs">
                    <MdOutlineDeleteSweep
                      size={20}
                      color="red"
                    ></MdOutlineDeleteSweep>
                  </button>
                </th>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;