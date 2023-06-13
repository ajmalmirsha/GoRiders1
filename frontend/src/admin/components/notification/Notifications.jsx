
import { useEffect, useState } from 'react'
import axios from 'axios'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './notifications.css'
import { ToastContainer, toast } from "react-toastify";

export default function Notifications () {
  const [notification , setNotification] = useState({
    title:'',
    message:'',
    user:false,
    owner:false,
    image:null
  })
  const [allNotifications, setallNotifications] = useState([])

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_URL}/admin/get-all-notifications`).then(({data:{data}})=>{
      console.log(data);
      setallNotifications([...data])
    })
  },[])

  function handleSubmit (e) {
    e.preventDefault()
    if(!notification.title.trim()){
      return toast.error('add a title !')
    }
    const formData = new FormData()
    console.log('notification',notification);
    formData.append('notification',JSON.stringify(notification))
   
    formData.append('image',notification.image) 
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
  }

    axios.post(`${process.env.REACT_APP_URL}/admin/add-notification`,formData,config).then(({data:{data}}) => {
      console.log('fdf');
      setallNotifications([...allNotifications,{...data}])
      setNotification({
        title:'',
        message:'',
        user:false,
        owner:false,
        image:null
      })
    })
    // console.log(notification,878); 
  }
    return (
        <div className="col-md-10 col-sm-9 mt-0">
   <div className="set-notifications my-5 mx-2 row">

    <input name='title' value={notification?.title} onChange={(e)=>{setNotification({...notification,[e.target.name]:e.target.value})}}  placeholder='Title' className='mx-3 mt-3 form-control w-25 remove-styles ' type="text"  />
 
    <textarea  name='message' value={notification?.message} onChange={(e)=>{setNotification({...notification,[e.target.name]:e.target.value})}}   cols="20" rows="10" placeholder='Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum voluptas nobis inventore esse maiores? Ad iure cupiditate, doloribus quas mollitia sed ab! Suscipit, quod! Repellat modi at culpa quia fugit maxime omnis vero commodi facere, error inventore tempora eos saepe. Sequi, aspernatur at! Vitae odit illum, error nemo perferendis tempora?'   className='ms-3 my-2 col-md-9 remove-styles message'></textarea>

    <label htmlFor='upload-notification-image' className='col-md-2'><img  className='w-100 notification-image'  src={ notification.image ?  URL.createObjectURL(notification.image) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY7qGmwPSyPiu7GB-Mr-vdSxc8jHTQlKL61g&usqp=CAU"} alt="" /></label>
    <input name='image' onChange={(e)=>{ setNotification({...notification,[e.target.name]:e.target.files[0]}) }} type="file" id='upload-notification-image'  hidden />

      <div className="row ms-2">
        <div className="col-md-2">
    <input type="checkbox" onChange={(e)=> setNotification({...notification,[e.target.name]:e.target.checked})} id='user' name='user' />
    <label className='ms-1 mb-2' htmlFor="user">for user</label>
        </div>
    <div className="col-md-2">
    <input type="checkbox" onChange={(e)=> setNotification({...notification,[e.target.name]:e.target.checked})} name='owner' />
    <label className='ms-1 mb-2' htmlFor="owner">for owner</label>
    </div>
      </div>
  { notification?.title?.length > 0 && (notification?.user || notification?.owner) && <div className=""><button className='w-25 mb-4 ms-3 btn btn-primary'  onClick={handleSubmit}>Submit</button></div>}
   </div>
<hr />
<div>
  <h5>Recent Notifications</h5>
  {
   allNotifications.length > 0 && allNotifications.map((x)=>{
      return (
        <div className="set-notifications my-5 mx-5 pb-2 row">
        <div className="col-md-9">
    
    <h4 className='mt-2' >{x.title}</h4>
 
    <span className='d-block mb-3' >{x.message}</span>
    { x.user && <span className='ms-3  bg-danger for-who px-2 fw-500'>user</span>}
    { x.owner && <span className='ms-3  bg-primary for-who px-2 fw-500'>owner</span>}
    </div>
   { x.image && <img className='col-md-2 m-2 notification-image' src={`${process.env.REACT_APP_URL}/public/images/notification/${x.image}`} alt="" />}
  { notification?.title?.length > 0 && <div className=""><button className='w-25 mb-4 ms-3 btn btn-primary'  onClick={handleSubmit}>Submit</button></div>}
   </div>
      )
    })
  }
  
</div>

<ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />   
        </div>
    )
}