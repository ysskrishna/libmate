"use client";

import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { selectCartBooks, selectCartIsLoading } from '@/redux/features/userCartSlice';
import { Role } from '@/common/constants';
import CommonLayout from '@/components/Layout/commonLayout';
import CartBookCard from '@/components/CartBookCard';
import Button from '@/components/Button';
import { checkoutBooks } from '@/redux/api/userCartApi';
import { selectUser } from '@/redux/features/authSlice';

const Cart = () => {  
  const dispatch = useDispatch();
  const cartBooks = useSelector(selectCartBooks);
  const isLoading = useSelector(selectCartIsLoading);
  const user = useSelector(selectUser);


  const handleCheckout = () => {
    const data = cartBooks.map((book) => {
      return {
        book_id: book.book_id,
        user_id: user?.id,
        collected_date: book.fromDate,
        due_date: book.toDate
      }
    })
    
    dispatch(checkoutBooks(data));
  }

  return (
    <CommonLayout allowedRoles={[Role.USER]}>
      <div className="flex-1 p-3 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className='flex flex-col'>
              {cartBooks.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {cartBooks.map((book, index) => (
                        <CartBookCard
                          key={index}
                          book={book}
                        />
                    ))}
                  </div>
                  <div>
                    <Button 
                      isLoading={isLoading}
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                  </div>
                </>
              ):(
              <p>Your cart is empty. <Link href={'/user/search'} className="text-gray-500 hover:underline">Search for books</Link></p>
              )}
        </div>
      </div>
  </CommonLayout>
  );
};

export default Cart;