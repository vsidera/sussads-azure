import Sidebar from "./components/sidebar/sidebar";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users"
import Home from "./pages/home/Home";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/admin";
import Contacts from "./pages/contacts/Contacts";
import Messages from "./pages/messages/Messages";
import AppServices from "./pages/app_services/app_services";
import Applications from "./pages/applications/Applications";
import AllApps from "./pages/applications/AllApps";
import AllServices from "./pages/services/Services";

function App() {
  return (
    <div className="App">
      <BrowserRouter>      
        <Routes>
          <Route path='/login' exact element={<Login/>} />
          <Route path="/apps/:id" element={<Home/>} />
          <Route path='apps/3' element={<Admin />} exact />
          <Route path='apps/:id/contacts' element={<Contacts/>} />
          <Route path='apps/:id/messages' element={<Messages/>} />
          <Route path='apps/:id/appservices' element={<AppServices/>} />
          <Route path='apps' element={<Applications/>} />
          <Route path='apps/:id/all-apps' element={<AllApps/>} />
          <Route path='apps/:id/users' element={<Users/>} />
          <Route path='apps/:id/services' element={<AllServices/>} />
        </Routes>
    
      </BrowserRouter>

    </div>
  );
}

export default App;
