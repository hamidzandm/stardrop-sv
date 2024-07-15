'use client';
import { useState, useEffect } from "react";


const CharacterAddForm = () => {
    const [mounted, setMounted] = useState(false);
    const [fields, setFields] = useState({
        type: '',
        name: '',
        description: '',
        location: {
          street: '',
          city: '',
          state: '',
          zipcode: '',
        },
        beds: '',
        baths: '',
        square_feet: '',
        amenities: [],
        rates: {
          weekly: '',
          monthly: '',
          nightly: '',
        },
        seller_info: {
          name: '',
          email: '',
          phone: '',
        },
        images: [],
      });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Check if nested property
        if (name.includes('.')) {
          const [outerKey, innerKey] = name.split('.');
    
          setFields((prevFields) => ({
            ...prevFields,
            [outerKey]: {
              ...prevFields[outerKey],
              [innerKey]: value,
            },
          }));
        } else {
          // Not nested
          setFields((prevFields) => ({
            ...prevFields,
            [name]: value,
          }));
        }
      };
      const handleAmenitiesChange = (e) => {
        const { value, checked } = e.target;
    
        // Clone the current array
        const updatedAmenites = [...fields.amenities];
    
        if (checked) {
          // Add value to array
          updatedAmenites.push(value);
        } else {
          // Remove value from array
          const index = updatedAmenites.indexOf(value);
    
          if (index !== -1) {
            updatedAmenites.splice(index, 1);
          }
        }
    
        // Update state with updated array
        setFields((prevFields) => ({
          ...prevFields,
          amenities: updatedAmenites,
        }));
      };
    
      const handleImageChange = (e) => {
        const { files } = e.target;
    
        // Clone images array
        const updatedImages = [...fields.images];
    
        // Add new files to the array
        for (const file of files) {
          updatedImages.push(file);
        }
    
        // Update state with array of images
        setFields((prevFields) => ({
          ...prevFields,
          images: updatedImages,
        }));
      };


  return (
    mounted && (
    <form>
        <h2 className='text-3xl text-center font-semibold mb-6'>
          Add Character
        </h2>
        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='eg. Larry'
            required
            value={fields.name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
            Datable
          </label>
          <select
            id='type'
            name='type'
            className='border rounded w-full py-2 px-3'
            required
            value={fields.type}
            onChange={handleChange}
          >
            <option value='true'>True</option>
            <option value='false'>False</option>
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
            Gender
          </label>
          <select
            id='type'
            name='type'
            className='border rounded w-full py-2 px-3'
            required
            value={fields.type}
            onChange={handleChange}
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>
       
        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-gray-700 font-bold mb-2'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            className='border rounded w-full py-2 px-3'
            rows='4'
            placeholder='Add an optional description of your character'
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className='mb-4 bg-blue-50 p-4'>
          <label className='block text-gray-700 font-bold mb-2'>Location</label>
          <input
            type='text'
            id='street'
            name='location.street'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='Location'
            value={fields.location.street}
            onChange={handleChange}
          />
          <input
            type='text'
            id='city'
            name='location.city'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='Region'
            required
            value={fields.location.city}
            onChange={handleChange}
          />
        </div>

        <div className='mb-4 flex flex-wrap'>
          <div className='w-full sm:w-1/3 pr-2'>
            <label
              htmlFor='beds'
              className='block text-gray-700 font-bold mb-2'
            >
              Manners
            </label>
            <select
             type='number'
             id='beds'
             name='beds'
             className='border rounded w-full py-2 px-3'
             required
             value={fields.beds}
             onChange={handleChange}
            >
              <option value='polite'>Polite</option>
            <option value='rude'>Rude</option>
            <option value='neutral'>Neutral</option>
            </select>
          </div>
          <div className='w-full sm:w-1/3 pr-2'>
            <label
              htmlFor='beds'
              className='block text-gray-700 font-bold mb-2'
            >
              Social
            </label>
            <select
             type='number'
             id='beds'
             name='beds'
             className='border rounded w-full py-2 px-3'
             required
             value={fields.beds}
             onChange={handleChange}
            >
              <option value='outgoing'>Outgoing</option>
            <option value='shy'>Shy</option>
            <option value='neutral'>Neutral</option>

            </select>
           
            
          </div>

          <div className='w-full sm:w-1/3 pr-2'>
            <label
              htmlFor='beds'
              className='block text-gray-700 font-bold mb-2'
            >
              Optimism
            </label>
            <select
             type='number'
             id='beds'
             name='beds'
             className='border rounded w-full py-2 px-3'
             required
             value={fields.beds}
             onChange={handleChange}
            >
              <option value='positive'>Positive</option>
            <option value='negative'>Negative</option>
            <option value='neutral'>Neutral</option>

            </select>
           
            
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>
            Relationships
          </label>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
            <div>
              <input
                type='checkbox'
                id='amenity_wifi'
                name='amenities'
                value='John'
                className='mr-2'
                checked={fields.amenities.includes('John')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor='amenity_wifi'>John</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_kitchen'
                name='amenities'
                value='Sebastian'
                className='mr-2'
                checked={fields.amenities.includes('Sebastian')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor='amenity_kitchen'>Sebastian</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_washer_dryer'
                name='amenities'
                value='Abigail'
                className='mr-2'
                checked={fields.amenities.includes('Abigail')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor='amenity_washer_dryer'>Abigail</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_free_parking'
                name='amenities'
                value='Jessica'
                className='mr-2'
                checked={fields.amenities.includes('Jessica')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor='amenity_free_parking'>Jessica</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_pool'
                name='amenities'
                value='Amy'
                className='mr-2'
                checked={fields.amenities.includes('Amy')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor='amenity_pool'>Amy</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='amenity_hot_tub'
                name='amenities'
                value='Indica'
                className='mr-2'
                checked={fields.amenities.includes('Indica')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor='amenity_hot_tub'>Indica</label>
            </div>
            
          </div>
        </div>

        <div className='mb-4 bg-blue-50 p-4'>
          <label className='block text-gray-700 font-bold mb-2'>
            Some Numerical Fields
          </label>
          <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
            <div className='flex items-center'>
              <label htmlFor='weekly_rate' className='mr-2'>
                Field 
              </label>
              <input
                type='number'
                id='weekly_rate'
                name='rates.weekly'
                className='border rounded w-full py-2 px-3'
                value={fields.rates.weekly}
                onChange={handleChange}
              />
            </div>
            <div className='flex items-center'>
              <label htmlFor='monthly_rate' className='mr-2'>
               Field 
              </label>
              <input
                type='number'
                id='monthly_rate'
                name='rates.monthly'
                className='border rounded w-full py-2 px-3'
                value={fields.rates.monthly}
                onChange={handleChange}
              />
            </div>
            <div className='flex items-center'>
              <label htmlFor='nightly_rate' className='mr-2'>
                Field 
              </label>
              <input
                type='number'
                id='nightly_rate'
                name='rates.nightly'
                className='border rounded w-full py-2 px-3'
                value={fields.rates.nightly}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <label
            htmlFor='seller_name'
            className='block text-gray-700 font-bold mb-2'
          >
            Birthday
          </label>
          <input
            type='text'
            id='seller_name'
            name='seller_info.name'
            className='border rounded w-full py-2 px-3'
            placeholder='eg. Spring 27'
            value={fields.seller_info.name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='seller_email'
            className='block text-gray-700 font-bold mb-2'
          >
            Field #
          </label>
          <input
            type='email'
            id='seller_email'
            name='seller_info.email'
            className='border rounded w-full py-2 px-3'
            placeholder='Field #'
            required
            value={fields.seller_info.email}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='seller_phone'
            className='block text-gray-700 font-bold mb-2'
          >
            Field #
          </label>
          <input
            type='tel'
            id='seller_phone'
            name='seller_info.phone'
            className='border rounded w-full py-2 px-3'
            placeholder='Field #'
            value={fields.seller_info.phone}
            onChange={handleChange}
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='images'
            className='block text-gray-700 font-bold mb-2'
          >
            Images (Select up to 4 images)
          </label>
          <input
            type='file'
            id='images'
            name='images'
            className='border rounded w-full py-2 px-3'
            accept='image/*'
            multiple
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-full focus:outline-none focus:shadow-outline'
         >
        Back
      </button>
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-full focus:outline-none focus:shadow-outline'
        type='submit'
      >
        Generate
      </button>
    </div>
          </form>
          )
          );
};

export default CharacterAddForm
