import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Table from "../MaterialUI/Table";
import columns from "./columns";
export default function SignedTableMain() {
    axios.defaults.withCredentials = true;
    const [document, setDocuFile] = useState(null);
    const [name, setName] = useState('');
    const [data, setData] = useState([]);


    const [sName, setSName] = useState('');
    const [date, setDate] = useState('');


    const handleSName = (event) => {
        setSName(event.target.value);
    }

    const handleDate = (event) => {
        setDate(event.target.value);
    }

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setDocuFile(selectedFile);
    }

    useEffect(() => {
        const getResult = () => {
            axios.get("https://imshrserver.ims.lol/getSignedDocuments").then((response) => {
                setData(response.data.result[0]);
            }).catch(error => {
                console.error('AxiosError:', error);
            });
        }
        getResult();
    }, [])

    const handleDelete = (row_id) => {
        const result = window.confirm('Do you want to continue?');
        if (result) {
            axios.delete("https://imshrserver.ims.lol/getSignedDocuments", {
                params: {
                    id: row_id
                }
            }).then((response) => {
                console.log(response);
                alert('Deleted Succesfully');
                window.location.reload();
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log('User clicked Cancel');
        }
    }

    const handleSearch = () => {
        // Assuming sName and date are defined before this point
        axios.get("https://imshrserver.ims.lol/getSignedDocuments/search", {
            params: {
                sName: sName,
                date: date
            }
        }).then((response) => {
            setData(response.data.result[0]);
        }).catch(error => {
            console.error('AxiosError:', error);
        });
    }

    return (
        <>
            <div className="document-table-container">
                <Navbar />
                <table>
                    <tr>
                        <th>Search Area</th>
                    </tr>
                    <tr>
                        <th><input type="text" placeholder="enter name" value={sName} onChange={handleSName} /></th>
                        <th><input type="date" value={date} onChange={handleDate} /></th>
                        <th></th>
                        <th><button onClick={handleSearch}>search</button></th>
                    </tr>
                </table>
                <Table
                    columns={columns}
                    rows={data}
                    handleDelete={handleDelete}
                />
            </div>
        </>
    );
}