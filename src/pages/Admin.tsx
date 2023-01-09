import { Outlet } from "react-router-dom";
import MyDialog from "../components/MyDialog/MyDialog";
import Sidebar from "../components/Sidebar/Sidebar";
import { useToggle } from "../hooks/useToggle";



function Admin() {
  const { state: open, toggleState: setOpen } = useToggle();
  return (
    <>
      <Sidebar children={<Outlet />} />
      <MyDialog data={{}} open={open} setOpen={setOpen} />
    </>
  )
}

export default Admin