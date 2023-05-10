import { useContext, useEffect,useState } from "react"
import AppContext from "../Context/AppContext"

export const UserProfile = () =>{
    const [error, setError] = useState();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        website: '',
        company: '',
      });        
    const {user,setUser} = useContext(AppContext);
    useEffect(()=>{
        async function fetchUserData(){
           
            const response = await fetch(`http://localhost:5000/profile?userid=${user}`);
            const data = await response.json();
            console.log(data);
            setUserData({
                name: data.name,
                email: data.email,
                phone: data.phone,
                ...data
            })
            if(data.error){
                setError(data.error);
            } else {
                return 
            }
        }
        fetchUserData();
    }, []);
  
   return(
    <div className="UserProfilePage">
      {user ? (
        <div className="UserProfilePage__content">
          <h1 className="UserProfilePage__name">{userData.name}</h1>
          <p className="UserProfilePage__email">Email: {userData.email}</p>
          <p className="UserProfilePage__phone">Phone: {userData.phone}</p>
          <p className="UserProfilePage__website">Website: {userData.website}</p>
          <p className="UserProfilePage__company">Company: {userData.company}</p>
          <button>edit profile</button>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}