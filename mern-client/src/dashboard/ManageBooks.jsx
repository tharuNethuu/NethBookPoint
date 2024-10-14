import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiTrash, HiPencil } from "react-icons/hi";
import Alert from '../components/Alert';



const ManageBooks = () => {
  const [allBooks, setAllBooks]= useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertVisible, setAlertVisible] = useState(false);
  useEffect(() =>{
    fetch("http://localhost:5000/all-books").then(res => res.json()).then(data => setAllBooks(data));
  },[])

  //delete books
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (confirmed) {
      fetch(`http://localhost:5000/book/${id}`, {
        method: "DELETE",
      }).then(res => res.json()).then(data => {
        setAlertMessage("Book is deleted successfully!");
        setAlertVariant("success");
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 5000);        setAllBooks(allBooks.filter(book => book._id !== id));
      }).catch(error => {
        console.error("Error deleting book:", error);
        setAlertMessage("Failed to delete book. Please try again.");
        setAlertVariant("warning");
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 5000);      });
    } else {
      setAlertMessage("Delete canceled.");
        setAlertVariant("danger");
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 5000); 
    }
  }
 

  return (
<div className='mx-4 sm:mx-10 md:mx-20 lg:mx-80 my-12'>
        <h2 className='mb-8 text-3xl font-bold text-yellow-600'>
        Manage <span className='text-black'>Your Books</span>
      </h2>
      {alertVisible && (
        <Alert message={alertMessage} variant={alertVariant} onClose={() => setAlertVisible(false)} />
      )}
      <table className="lg:w-[1000px] ">
          <thead>
            <tr className="bg-yellow-200 rounded-xl">
            <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Book Name</th>
              <th className="px-4 py-2">Author name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Edit or Delete</th>
            </tr>
          </thead>
          {
            allBooks.map((books,index) => <tbody className='divide-y' key={books._id}>
<tr className="bg-white">
            <td className="border px-4 py-2 whitespace-nowrap">{index+1}</td>
              <td className="border px-4 py-2 whitespace-nowrap">{books.bookTitle}</td>
              <td className="border px-4 py-2">{books.authorName}</td>
              <td className="border px-4 py-2">{books.category}</td>
              <td className="border px-4 py-2">{books.Price}</td>
              <td className="border px-4 py-2  flex items-center">
                <Link className="text-yellow-600 font-semibold hover:underline px-2"
               to={`/admin/dashboard/edit-books/${books._id}`}><HiPencil/></Link> 
                
                <button onClick={()=> handleDelete(books._id)} className=' px-2 font-semibold text-yellow-600 rounded-full
                hover:text-black '><HiTrash/></button>


              
              </td>
            </tr>
            </tbody> )
          
          }
          
          
         
        </table>
    </div>
  );
};

export default ManageBooks;