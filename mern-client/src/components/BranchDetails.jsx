import React from 'react'

const BranchDetails = () => {
    const branches = [
        {
            branch:'Kurunegala',
          location: 'Main Street, City Center',
          contact: '123-456-7890',
          oph:'Operating Hours: Monday to Saturday, 9 AM - 7 PM; Sunday, 10 AM - 5 PM',
          service:' In-store shopping, Special discounts for students, Workshops, Study spaces',
        },
        {
            branch:'Kandy',
            location: 'Green Avenue, Westside',
          contact: '987-654-3210',
          oph:'Operating Hours: Monday to Saturday, 9 AM - 6 PM; Closed on Sunday',
          service:'Services Offered: In-store shopping, Community events, Author signings, Kids reading sessions',
        },
        {
            branch:'Galle',
            location: 'Market Road, Eastside',
          contact: '456-789-1234',
          oph:'Operating Hours: Monday to Saturday, 9 AM - 5 PM; Sunday, 11 AM - 4 PM',
          service:'Services Offered: In-store shopping, Online order pick-ups, Reading events, Book clubs',
        },
        {
            branch:'Colombo',
            location: 'Highway 54, North End',
          contact: '321-654-9870',
          oph:'Operating Hours: Monday to Friday, 10 AM - 6 PM; Saturday, 10 AM - 4 PM; Closed on Sunday',
          service:'Services Offered:  In-store shopping, Book recommendations, Language classes, Book fairs',
        },
      ];
    
      return (
        <div style={{ display: 'flex', text: 'yellow-200', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }} className='flex flex-col lg:flex-row w-full justify-between items-center py-10'>
          {branches.map((branch, index) => (
            <div key={index} style={{ flex: 1, padding: '10px', textAlign: 'center', borderRight: index !== branches.length - 1 ? '1px solid #ccc' : 'none' }}>
            <h2 className='text-yellow-400 text-xl'>{branch.branch}</h2>
              <h3 className='text-white py-2' >{branch.location}</h3>
              <p className='text-yellow-100 py-2'>Contact: {branch.contact}</p>
              <p className='text-white py-2'>{branch.oph}</p>
              <p className='text-yellow-100'> {branch.service}</p>

            </div>
          ))}
        </div>
      );
    };
export default BranchDetails
