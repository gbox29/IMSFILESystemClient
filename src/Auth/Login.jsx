import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    // const [token, setToken] = useState('');
    // const [uId, setUId] = useState(null);

    const handleUserId = (e) => {
        setUserId(e.target.value);
    }

    const handleUserPassword = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = () => {
        axios.get('//13.215.156.71/login', {
            params: {
                userId:userId,
                password:password
            }
        })
            .then(response => {
                // Handle successful response
                alert(response.data.message);
                if(response.data.token) {
                    // setToken(response.data.token);
                    // setUId(response.data.userId);
                    // navigate(`/?userId=${response.data.userId}`, { state: { token: response.data.token, userId: response.data.userId } });
                    navigate("/documents");
                    window.location.reload();
                }
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching data:', error);
            });
    }

    return (
        <>
            <div className="login-container">
                <div className="login-form-container">
                    <div className="login-id">
                        <input type="text" value={userId} placeholder="username" onChange={handleUserId} />
                    </div>
                    <div className="login-password">
                        <input type="password" value={password} placeholder="password" onChange={handleUserPassword} />
                    </div>
                    <div className="login-password">
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </>
    );
}