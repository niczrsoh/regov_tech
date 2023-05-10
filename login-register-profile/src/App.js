import logo from './logo.svg';
import './App.css';
import { Login } from './Screens/Login';
import  Router  from './Router/router';
import { useState } from 'react';
import { Register } from './Screens/Register';
import { UserProfile } from './Screens/UserProfile';
function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [login, setLogin] = useState('fail');
  const toggleForm=(formName)=>{
    setCurrentForm(formName);
  }
  const toggleLogin=(login)=>{
    setLogin(login);
  }
  return (
    <div className="App">
      {login != "fail"?
      <UserProfile/>:
        currentForm === "login" ? <Login onForceSwitch={toggleForm} onSwitchLogin={toggleLogin}/>:<Register onForceSwitch={toggleForm}/>
      }

    </div>
   
  );
}

export default App;
