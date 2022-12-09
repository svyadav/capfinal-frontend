import React from "react"
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { serverUrl,clientUrl } from "../config";

const Home=()=>{
    const [user, setUser] = useState(null);
    const [welcomePage,setWelcomePage]=useState(null)
    const logout = () => {
        window.open(`${serverUrl}/auth/logout`, "_self");
        
      };
    useEffect(() => {
        const getUser = () => {
          fetch(`${serverUrl}/auth/login/success`, {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": clientUrl
            },
          })
            .then((response) => {
              if (response.status === 200) return response.json();
              throw new Error("authentication has been failed!");
            })
            .then((response) => {
              console.log('user',response)
              setUser(response.user);
              setWelcomePage(<div>
                <h1>Welcome {response.user.displayName}</h1>
                <div>
                  <h3>Details</h3>
                  <div>
                    <img src={response.user.photos[0].value} alt="pic"></img>
                  </div>
                </div>
                <div className="logout-btn">
            <Button variant="danger" onClick={logout}>
              Log Out
            </Button>
          </div>
              </div>)
            })
            .catch((err) => {
              setWelcomePage(<div>
                <h1>Login failed</h1>
              </div>)
            console.log(err);
              console.log(err);
            });
        };
        getUser(); 
      }, []);
    return <>
       <div className="home">
        {
          welcomePage
        } 
      </div>

    </>
}
export default Home