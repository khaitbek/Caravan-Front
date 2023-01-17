import "./assets/styles.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import { AdminOrderList, DefaultOrderList } from "./components/OrderList/OrderList";
import {AdminTruckList, DefaultTruckList} from "./components/TruckList/TruckList";
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";


function App() {
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={token ? <Navigate replace={true} to="/admin" /> : <Home />}>
          <Route path="trucks" element={<DefaultTruckList />} />
          <Route index element={<DefaultOrderList />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={token ? <Admin /> : <Navigate replace={true} to="/login" />}>
          <Route path="trucks" element={<AdminTruckList />} />
          <Route path="orders" element={<AdminOrderList />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
