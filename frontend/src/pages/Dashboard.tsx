import AxiosInstance from "../components/AxiosInstance.tsx";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();
  const logoutUser = () => {

    console.log("we clicked logout")
    AxiosInstance.post(`logoutall/`, {}).then(
      () => {

        localStorage.removeItem("Token")
        navigate('/')
        console.log("Log out successfull")
      }
    )

  }

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
        {/* logout tmp button here to test function*/}
        <Button type={"button"} onClick={logoutUser}>Log out user</Button>
      </div>
    </>
  );
}
