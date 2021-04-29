import React, {useEffect, useState} from 'react';
import API from '../../Services';
import {ILNullPhoto} from '../../Assets';
import ShowMoreText from 'react-show-more-text';

const ReviewList = ({id}) => {
    const [reviews, setReviews] = useState([]);
    
    const getReviews = async (id) => {
        const fetchReview = await API.getReview(id);
        setReviews(fetchReview.results);
    }

    useEffect(() => {
        if(id !== 0){
            getReviews(id);
        }
    },[id]);
    

    console.log('review : ',reviews);
    return(
        <>
            {reviews && reviews.map((item, i) => {
                const avatar = item.author_details.avatar_path.substring(1);
                return(
                    <div key={i} className='flex space-x-5 p-5'>
                        <div className=''>
                            <img src={ILNullPhoto} alt='author' className='w-12 ring-4 ring-gray-200 rounded-full max-w-none' />
                            <div className='flex justify-center pt-2'>
                                <svg className='flex w-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <p className='text-center font-bold'>{item.author_details.rating}</p>
                                <svg className='flex w-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-white font-bold'>{item.author}</h1>
                            <ShowMoreText
                                lines={4}
                                more= {<p className='font-bold text-base text-xs'>Show More</p>}
                                less={<p className='font-bold text-base'>Show Less</p>}
                                className='font-mono text-sm'
                                anchorClass='my-anchor-css-class'
                                expanded={false}
                                width={900}
                            >
                                {item.content}
                            </ShowMoreText>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ReviewList;