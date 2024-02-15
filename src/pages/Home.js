import React , {useState,useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector , useDispatch } from 'react-redux'
import { getAllBikes } from '../redux/actions/bikesActions'
import { Button,Row, Col, DatePicker,  Flex } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import moment from 'moment'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const { RangePicker } = DatePicker;

function Home() {
  const {bikes} = useSelector(state=>state.bikesReducer)
  const {loading} = useSelector(state=>state.alertsReducer)
  const [totalbikes, setTotalbikes] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBikes())
}, [])

useEffect(() => {
  setTotalbikes(bikes)
}, [bikes])

function setFilter(values){

  var selectedFrom = moment(values[0].$d , 'MMM DD YYYY HH:mm')
  console.log(selectedFrom)
  var selectedTo = moment(values[1].$d, 'MMM DD YYYY HH:mm')

  var temp=[]

  for(var bike of bikes){

        if(bike.bookedTimeSlots.length == 0){
            temp.push(bike)
        }
        else{

             for(var booking of bike.bookedTimeSlots) {

                 if(selectedFrom.isBetween(booking.from , booking.to) ||
                 selectedTo.isBetween(booking.from , booking.to) || 
                 moment(booking.from).isBetween(selectedFrom , selectedTo) ||
                 moment(booking.to).isBetween(selectedFrom , selectedTo)
                 )
                 {

                 }
                 else{
                     temp.push(bike)
                 }

             }

        }

  }


  setTotalbikes(temp)


}
  return (
    <>
    <DefaultLayout>
    <Row className='mt-3' justify='center'>
      <Col lg={20} sm={24} className='d-flex justify-content-left'>
        <RangePicker showTime={{ format: "HH:mm" }}
           format="MMM DD YYYY HH:mm" onChange={setFilter}/>

        
      </Col>
    </Row>

      {loading == true && (<Spinner/>)}
        {/* <h1>Home Page</h1>
        <h1>The length of bikes array is {bikes.length}</h1> */}
        {/* <Button type="primary">Antd Button</Button> */}
        <Row justify="center" gutter={16} className="mt-5">
          {totalbikes.map(bikes=>{
            return <Col key={bikes._id} lg={5} sm={24} xs={24}>
            <div className="bike p-2 bs1">
               <img src={bikes.image} className="bikeimg"/>

               <div className="bike-content d-flex align-items-center justify-content-between">

                    <div className='text-left pl-2'>
                        <p>{bikes.name}</p>
                        <p> Price Per Hour {bikes.pricePerHour} /-</p>
                    </div>

                    <div>
                        <button className="btn1 mr-2"><Link className='link' to={`/booking/${bikes._id}`}>Book Now</Link></button>
                        
                    </div>

               </div>
            </div>
       </Col>
          })}
        </Row>
    </DefaultLayout>
    </>
  )
}

export default Home