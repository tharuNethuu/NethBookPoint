import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import './BookCards.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6'

const BookCards = ({headline, books}) => {
   // console.log(books);
    
  return (
    <div className='px-4 lg:px-40'>
    <h2 className='mt-20 text-5xl text-center font-bold text-black my-5 '>{headline}</h2>  

    {/*cards*/}
    <div>
    <Swiper
  slidesPerView={1} // Default number of slides per view
  spaceBetween={10} // Default space between slides
  pagination={{
    clickable: true,
  }}
  breakpoints={{
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3, // Adjust the number of slides per view for this breakpoint
      spaceBetween: 30, // Adjust the space between slides for this breakpoint
    },
    1024: {
      slidesPerView: 4, // Adjust the number of slides per view for this breakpoint
      spaceBetween: 40, // Adjust the space between slides for this breakpoint
    },
  }}
  modules={[Pagination]}
  className="mySwiper w-full h-full"
>
  {books.map(book => (
    <SwiperSlide key={book._id}>
      <Link to={`/book/${book._id}`}>
        <div className='relative'>
          <img src={book.imageUrl} alt="" />
          <div className='absolute top-3 right-3 bg-yellow-600 hover:bg-black p-2 rounded'>
            <FaCartShopping className='w-4 h-4 text-white'/>
          </div>
        </div>
        <div className='bookdetails'>
          <h3 className='font-semibold'>{book.bookTitle}</h3>
          <p>{book.authorName}</p>
        </div>
      </Link>
    </SwiperSlide>
  ))}
</Swiper>

    </div>
    </div>
  )
}

export default BookCards
