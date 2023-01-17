import { useEffect } from "react";
import {Header} from "../components/Header/Header";
import MyTabList from "../components/MyTabList/Tablist";
import axios from "axios";

function Home() {
    useEffect(()=>{
        async function getUsers(){
            try {
                const users = await fetch("http://194.187.122.221/api/orders", {
                    headers:{
                        "Authorization":"Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJqb2huQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE2NzM4ODA0MjYsImlzcyI6ImNhcmF2YW4udXoiLCJhdWQiOiJjYXJhdmFuLnV6In0.YYEYHk7dIkzRxMgk4P-DqmwKomEOrxst0B3tH90Hsn0",
                        "Content-Type":"application/json"
                    }
                });
                console.log(users);
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();
    },[]);
    return (
        <>
            <Header />
            <main>
                <MyTabList />
            </main>
        </>
    )
}

export default Home