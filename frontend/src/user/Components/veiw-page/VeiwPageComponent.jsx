import React, { useEffect, useState } from 'react';
import './viewPage.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import ReactImageMagnify from 'react-image-magnify'
import img from '../../../../src/images/default.png'
const ViewPageComponent = () => {
  const user = useSelector(state => state.user)
  const [vehicle, setVehicle] = useState({});
  const [reviews,setReviews] = useState([])
  const { id } = useParams();
  const [avgRating,setAvgRating] = useState(0)
 const [mainImage,setMainImage] = useState(0)
  useEffect(() => {
    async function getVehicleData() {
      const { data } = await axios.get(process.env.REACT_APP_URL + `/vehicle/data/${id}`);
      console.log(data,767  );
      setVehicle(data.data);
      setReviews(data.data.reviews.reverse())
    }
    getVehicleData();
    console.log(reviews,88864);
    
  }, []);
  
useEffect(()=>{
  console.log(reviews);
  const ratingsSum = reviews.reduce((sum, review) => sum + review.rating, 0);
  const avgRating = ratingsSum / reviews.length;
  const roundedAvgRating = avgRating.toFixed(); // Round to 1 decimal place
  console.log(roundedAvgRating,87878);
  setAvgRating(roundedAvgRating)
},[reviews])
 
const navigate = useNavigate()
  
  // State for rating
  const [rating, setRating] = React.useState(0);

  // State for review
  const [review, setReview] = React.useState('');

  // State for selected images
  const [ selectedImages, setSelectedImages] = React.useState({});

  // Handle rating change
  const handleRatingChange = (value) => {
    console.log(value,99);
    setRating(value);
    console.log(rating);
  };

  // Handle review change
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    // const images =  URL.createObjectURL( e.target.files[0])
  
    setSelectedImages(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform actions with rating, review, and selected images data (e.g., save to database)
    console.log('Rating:', rating);
    console.log('Review:', review);
    console.log('Selected Images:', selectedImages);
    console.log('vehiovle:', vehicle);
    // Reset rating, review, and selected images after submission
  
    try {
      // const axios = await import('axios')
      console.log('axios gone');
      const reviewData = {
        rating,
        review,
        vehicleId:vehicle._id,
        userId:user.id,
        userImage:user.image,
        username:user.username
      }
      const formData = new FormData()
      formData.append('image',selectedImages)
      formData.append('reviewData',JSON.stringify(reviewData))
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      };
     
      axios.post( process.env.REACT_APP_URL + '/vehicle/review/add',formData, config).then((response)=>{
        console.log(response,878878);
        const data = response.data
        console.log(data,45);
        // const newArray = reviews
        // console.log(newArray.length,98);
        // newArray.push(data)
        // console.log(newArray.length,98);
        // console.log(newArray,98);
        setReviews(data.data.reviews.reverse())
      })
      setRating(0);
      setReview('');
      setSelectedImages('');

    } catch (error) {
      
    }
   
  };

  return (
    <div className="product-details-container">
      <div className="row w-100">
        <div className="col-lg-6 " >
          {/* <img className="product-image img-fluid" src={`${process.env.REACT_APP_URL}/public/images/${vehicle?.image?.length && vehicle?.image[mainImage]}`} alt={vehicle?.name} /> */}
          <ReactImageMagnify className='zoom-image'
                        {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: `${process.env.REACT_APP_URL}/public/images/${vehicle?.image?.length && vehicle?.image[mainImage]}`,
                            },
                            largeImage: {
                                src: `${process.env.REACT_APP_URL}/public/images/${vehicle?.image?.length && vehicle?.image[mainImage]}`,
                                width: 1200,
                                height: 1200,
                            },
                            enlargedImageContainerDimensions: {
                                width: '100%',
                                height: '100%',
                            },
                        }}
                    />
       <div className="gap-5">{
      vehicle?.image?.length &&  vehicle?.image.map((x,i)=>{
      
         return(   i !== mainImage  && <img key={i} src={`${process.env.REACT_APP_URL}/public/images/${x}`} alt="" onClick={()=>{ setMainImage(i) }} className="col-md-3 my-5 me-3  sub-images" /> )

        })
       }</div>
        </div>
        <div className="col-lg-6 ">
          <div className="product-info">
            <h2 className="product-name">{vehicle?.product_name}</h2>
              {/* total average stars */}
              <div className="total-review-stars">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span
                          key={value}
                          style={{fontSize: '24px'}}
                          className={`star-icon ${value <= avgRating ? 'filled' : ''}`}
                        >
                          ★
                        </span>

                      ))}
                    </div>
            <div className="product-brand">Brand: {vehicle?.brand}</div>
            <div className="product-model">Model: {vehicle?.model}</div>
            <div className="product-year">Year: {vehicle?.year}</div>
            <div className="product-price">{vehicle?.price}</div>
            <div className="product-description">{vehicle?.description}</div>

          <button onClick={()=> { navigate(`/checkout/${vehicle._id}`) }} className='btn btn-primary'>Book Now</button>
            <form onSubmit={handleSubmit}>
              <div className="rating-container">
                <span className="rating-label">Rate this product:</span>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <span
                      key={value}
                      className={`star-icon ${value <= rating ? 'filled' : ''}`}
                      onClick={() => handleRatingChange(value)}
                    >
                      ★
                    </span>
                  ))}
              
                </div>
              </div>

              <div className="review-container">
                <span className="review-label">Write a review:  <label htmlFor="image-upload"><FontAwesomeIcon icon={faImage} /></label></span>
                <textarea
                  className="review-textarea form-control"
                  rows={4}
                  value={review}
                  onChange={handleReviewChange}
                  placeholder="Enter your review here..."
                />
              </div>

              {/* <div className="selected-images-container">
                {selectedImages &&
                  <img
                    className="selected-image img-fluid"
                    src={selectedImages}
                    alt={`Selected Image`}
                  />
                }
              </div> */}

              <div className="mb-3">
                <input
                hidden
                  className="image-input form-control"
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                />
              </div>

              <button className="submit-button btn btn-primary" type="submit">Submit {reviews?.userimage}</button>
            </form>

            <ul className="reviews-list h-25 my-4 ">
              { reviews.length ? reviews.map((review) => (
                <li className="review-item row">
                <div className="col-md-9">
                  <div className="review-rating">
                  <img className='me-2'  src={ review?.userimage?.slice(0,33) == 'https://lh3.googleusercontent.com'  ?   review.userimage  : review.userimage ? `${process.env.REACT_APP_URL}/public/images/${review.userimage}` : img} alt="" />
                    <span className="review-rating-label">{review.username}</span>
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span
                          key={value}
                          className={`star-icon ${value <= review.rating ? 'filled' : ''}`}
                        >
                          ★
                        </span>

                      ))}
                    </div>
                  </div>   
                  <p className="review-text">{review.review}</p>
                  </div>
               { review.image &&   <div className="col-md-3">
                  <img className='review-image' src={`${process.env.REACT_APP_URL}/public/images/reviewImages/${review.image}`} alt="" />
                  </div> }
                </li>
              )) : "add your first review"}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPageComponent;
