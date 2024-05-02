import "./dtm.css";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Table from "../MaterialUI/Table";
import columns from "./columns";
export default function DocumentTableMain() {
    axios.defaults.withCredentials = true;
    const [document, setDocuFile] = useState(null);
    const [name, setName] = useState('');
    const [data, setData] = useState([]);

    const [sName, setSName] = useState('');
    const [date, setDate] = useState('');

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setDocuFile(selectedFile);
    }

    const handleSName = (event) => {
        setSName(event.target.value);
    }

    const handleDate = (event) => {
        setDate(event.target.value);
    }

    const handleSearch = () => {
        // Assuming sName and date are defined before this point
        axios.get("http://localhost:8000/getDocuments/search", {
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

    const handleDelete = (row_id) => {
        const result = window.confirm('Do you want to continue?');
        if (result) {
            axios.delete("http://localhost:8000/getDocuments", {
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

    useEffect(() => {
        const getResult = () => {
            axios.get("http://localhost:8000/getDocuments").then((response) => {
                setData(response.data.result[0]);
            }).catch(error => {
                console.error('AxiosError:', error);
            });
        }
        getResult();
    }, [])

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('document', document);
        if (document) {
            axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    name
                }
            })
                .then(response => {
                    if (response) {
                        alert("updated successfully");
                    } else {
                        alert("No Response");
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            alert("Dont forget the file");
        }
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
                        <th><input type="text" placeholder="enter name" value={sName} onChange={handleSName}/></th>
                        <th><input type="date" value={date} onChange={handleDate}/></th>
                        <th></th>
                        <th><button onClick={handleSearch}>search</button></th>
                    </tr>
                    <tr>
                        <th>Upload Here</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th><input type="text" value={name} onChange={handleName} placeholder="enter a name" /></th>
                        <th><input type="file" onChange={handleFileChange} /></th>
                        <th></th>
                        <th><button onClick={handleSubmit}>upload</button></th>
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