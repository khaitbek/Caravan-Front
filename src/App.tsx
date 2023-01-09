import "./assets/styles.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import { AdminOrderList, DefaultOrderList } from "./components/OrderList/OrderList";
import {AdminTruckList, DefaultTruckList} from "./components/TruckList/TruckList";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="trucks" element={<DefaultTruckList />} />
          <Route index element={<DefaultOrderList />} />

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="trucks" element={<AdminTruckList />} />
          <Route path="orders" element={<AdminOrderList />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
