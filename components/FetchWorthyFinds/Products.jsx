import React from 'react';
import Product from './Product';
import Pagination from '../FriendsPage/Pagination';
import img1 from "../../asserts/product.png";

const Products = () => {
    const products = [
        {
          id: 1,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 2,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 3,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 4,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 5,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 6,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 7,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 8,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 9,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 10,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id:11,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 12,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 13,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 14,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 15,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 16,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 17,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 18,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 19,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
        {
          id: 20,
          name: "Dog Food",
          price: 160.00,
          image: 'ED',
        },
      ]
    return (
        <div className='bg-[FFFAF5] md:mt-[100px] place-items-center'>
           <div className="ProductList text-center text-[#302f51] text-[40px] font-bold md:mb-[52px]">Product List</div>


      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-10 ">
        {products.map((product) => <Product key={product.id} product={product} />)}

     
      </main>

      <div className='py-[50px]'>
      <Pagination/>
      </div>
        </div>
    );
};

export default Products;