
import { useNavigate } from 'react-router-dom'
import './sidebar.css'

function SideBar ({ props }) {
    console.log(props,7676);
    const navigate = useNavigate()
    return (
        <div className="side-bar ms-4  px-0  py-2 col-md-2 col-sm-4 ">
            <div onClick={()=>{ navigate('/owner-Home') }} className="menu-items pt-1 text-center text-white">
               Home
            </div>
            <div className="menu-items pt-1 text-center text-white">
               Sales Report
            </div>
            { props != 'list-vehicle' || props == 'add-vehicle'  ? <div onClick={()=> navigate('/owner/list-vehicle')} className="menu-items pt-1 text-center text-white">
               Vehicles
            </div> : <div onClick={()=> navigate('/owner/add-vehicle')} className='menu-items-active  pt-1 text-center text-dark fw-bold'>add vehicle</div> 
             }
            <div className="menu-items pt-1 text-center text-white">
               Messages
            </div>
            <div className="menu-items pt-1 text-center text-white">
               Payments
            </div>
            <div className="menu-items pt-1 text-center text-white">
               Notifications
            </div>
            <div onClick={()=> navigate('/bookings')} className="menu-items pt-1 text-center text-white">
               bookings
            </div>
        </div>
    )
}

export default SideBar