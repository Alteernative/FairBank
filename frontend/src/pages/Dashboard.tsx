import AxiosInstance from "../components/AxiosInstance.tsx";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const logoutUser = () => {
    console.log("we clicked logout");
    AxiosInstance.post(`logoutall/`, {}).then(() => {
      localStorage.removeItem("Token");
      navigate("/");
      console.log("Log out successfull");
    });
  };

  const [myData, setMyData] = useState([]);
  console.log(myData);
  const GetData = () => {
    AxiosInstance.get("users/")
      .then((res) => {
        setMyData(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <div>
        {myData ? (
          <div>
            <div>ID: {myData.id}</div>
            <div>Email: {myData.email}</div>
            <div>First Name: {myData.first_name}</div>
            <div>Last Name: {myData.last_name}</div>
            <div>Balance: {myData.balance}</div>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </>
  );
}
