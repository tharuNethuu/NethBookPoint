import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';


const EditBooks = () => {
  const { id } = useParams();
  const { bookTitle, authorName, imageUrl, category, bookDescription, Price, availability,offerImage,SinhalaDes,EnglishDes } = useLoaderData();
  const Bookcategory = ["Novel", "Poem Book", "Translations", "Kids' Stories"];
  const [selectedBookCategory, setSelectedBookCategory] = useState(category);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertVisible, setAlertVisible] = useState(false);

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const category = form.category.value;
    const bookDescription = form.bookDescription.value;
    const Price = form.price.value;
    const imageUrl = form.imageUrl.value;
    const availability = form.availability.value;
    const offerImage = form.offerImage.value
    const SinhalaDes = form.SinhalaDes.value;
    const EnglishDes = form.EnglishDes.value;


    const updatebooksObj = {
      bookTitle, authorName, category, bookDescription, Price, imageUrl, availability,offerImage,SinhalaDes,EnglishDes
    };

    fetch(`https://nethbookpoint.onrender.com/book/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatebooksObj)
    }).then(res => res.json()).then(data => {
      console.log('Book update response:', data); // Logging response
      setAlertMessage("Book is updated successfully!");
      setAlertVariant("success");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 5000); // Hide alert after 5 seconds
    }).catch(error => {
      console.error('Error updating book:', error); // Logging error
      setAlertMessage("Failed to update the book.");
      setAlertVariant("danger");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 5000); // Hide alert after 5 seconds
    });
  };



  return (
<div className='mx-4 sm:mx-10 md:mx-20 lg:mx-80 my-12'>
        <h2 className=' mb-8 text-3xl font-bold text-yellow-600'>Update <span className='text-black'>Your Book Details</span> </h2>
      {alertVisible && (
        <Alert message={alertMessage} variant={alertVariant} onClose={() => setAlertVisible(false)} />
      )}
      <form onSubmit={handleUpdate} className="flex lg:w-[1000px] flex-col flex-wrap gap-4">
{/*       1st row
 */}     
 
  <div className='flex gap-8'>
      <div className='lg:w-1/2'>
        <div className="mb-2 block rounded-xl">
          <Label  htmlFor="bookTitle" value="Book Title" />
        </div>
        <TextInput
        id="bookTitle"
        name='bookTitle'
         type= "text"
          placeholder ="    Enter book title"
           required 
           defaultValue={bookTitle}
           />
                 </div>


      

      <div className='lg:w-1/2'>
        <div className="mb-2 block rounded-xl">
          <Label  htmlFor="authorName" value="Author Name" />
        </div>
        <TextInput 
        id="authorName"
        name='authorName'
         type= "text"
          placeholder ="    Enter Author Name"
           required
           defaultValue={authorName} />
      </div>

      
      </div>

 <div className='flex gap-8'>

 <div className='lg:w-1/2'>
        <div className="mb-2 block rounded-xl">
          <Label  htmlFor="imageUrl" value="Image URL" />
        </div>
        <TextInput 
        id="imageUrl"
        name='imageUrl'
         type= "text"
          placeholder ="    Enter Image URL"
           required 
           defaultValue={imageUrl}/>
      </div>
      

      <div className='lg:w-1/2'>
        <div className="mb-2 block rounded-xl">
          <Label  htmlFor="inputState" value="Book Category" 
          defaultValue={category}/>
        </div>
       
        <select id='inputState' name='category' className='w-full rounded' value={selectedBookCategory}
        onChange={handleChangeSelectedValue}> 
        {
          Bookcategory.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))
        }

          </select>     
           </div>

      </div>

{/*       3rd row
 */}

<div className='flex gap-8' >
  <div className='lg:w-1/2'>
    <div className="mb-2 block rounded-xl">
          <Label  htmlFor="price" value="Book Price" />
        </div>
        <TextInput 
        id="price"
        name='price'
         type= "text"
          placeholder ="    Enter Price: format should be 'Rs. xxxx/='"
           required 
           defaultValue={Price}/>
      
  </div>

  <div className='lg:w-1/2'>
    <div className="mb-2 block rounded-xl">
          <Label  htmlFor="availability" value="Availability of the Book" />
        </div>
        <TextInput 
        id="availability"
        name='availability'
         type= "text"
          placeholder ="    ex: Available across all branches/Available in Kandy and Colombo branches only"
           required 
           defaultValue={availability}/>
      
  </div>


  

</div>


{/* 4th row
 */}  
 <div className='flex gap-8' >
  <div className='lg:w-1/2'>
    <div className="mb-2 block rounded-xl">
          <Label  htmlFor="offerImage" value="Single Book Image URL" />
        </div>
        <TextInput 
        id="offerImage"
        name='offerImage'
         type= "text"
          placeholder ="    Enter Single Book Image Link"
           required 
           defaultValue={offerImage}/>
      
  </div>  

</div>

{/* 5th row
 */}     
 
 <div className='flex gap-8'>

    
  <div className='lg:w-1/2'>
        <div className="mb-2 block rounded-xl">
          <Label  htmlFor="EnglishDes" value="English Description" />
        </div>
        <Textarea 
        id="EnglishDes"
        placeholder ="    Enter short description about the book in English"
        rows={4}
          
           defaultValue={EnglishDes}/>
      </div>

      <div className='lg:w-1/2'>
      <div className="mb-2 block rounded-xl">
          <Label  htmlFor="SinhalaDes" value="Sinhala Description" />
        </div>
        <Textarea 
        id="SinhalaDes"
        placeholder ="    Enter short description about the book in Sinhala"
        rows={4}
           
           defaultValue={SinhalaDes}/>
      </div>


      </div>


{/* 6th row
 */}     
 
  <div className='flex gap-8'>

    
  <div className='lg:w-1/2'>
        <div className="mb-2 block rounded-xl">
          <Label  htmlFor="bookDescription" value="Book Description" />
        </div>
        <Textarea 
        id="bookDescription"
        placeholder ="    Enter short description about the book"
        rows={4}
           required 
           defaultValue={bookDescription}/>
      </div>

      <div className='lg:w-1/2'>
        <div className="mb-2 block rounded-xl">
          <Label  htmlFor="" value="Comments" />
        </div>
        <Textarea
        id="comment"
        placeholder ="    Enter any comments here"
        rows={4}
           />
      </div>


      </div>
      <div >
      <Button type="submit" className='  mt-5 font-semibold text-xl bg-yellow-600' >Update Book</Button>

      </div>
      
    </form>
      </div>

  )
}

export default EditBooks
