import "./navbar.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export default function Navbar() {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    return (
        <>
            <div className="navbar-container div-container">
                <div className="navbar-logo">
                    <img src='#' alt="logo" />
                </div>
                <div className="navbar-search-bar">

                </div>
                <div className="nav-bar-username">

                </div>
                <div className="navbar-navigation-list">
                    <ul>
                        <li onClick={() => navigate("/documents")}>Documents</li>
                        <li onClick={() => navigate("/signed")}>Signed Documents</li>
                        <li>Change PW</li>
                        <li onClick={() => {
                            axios.delete("https://imshrserver.ims.lol/logout").then((response) => {
                                if(response) {
                                    navigate("/");
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        }}>Logout</li>
                    </ul>
                </div>
            </div>
        </>
    );
}