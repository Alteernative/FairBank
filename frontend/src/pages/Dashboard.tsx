import AxiosInstance from "../components/AxiosInstance.tsx";
import {useEffect, useState} from "react";

export default function Dashboard() {

    const [myData, setMyData] = useState([]);

    const GetData = () => {
        AxiosInstance.get('users/').then((res) => {
            setMyData(res.data);
        }).catch((error) => {
            console.error("There was an error fetching the data!", error);
        });
    }

    useEffect(() => {
        GetData();
    }, []);


    return (
    <>
      <h1>Dashboard</h1>
      <div>
        {myData.length > 0 ? (
          <div key={0}>
            <p>ID: {myData[0].id}</p>
            <p>Email: {myData[0].email}</p>
            <p>Balance: {myData[0].balance}</p>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </>
  );
}
