import { useRef, useEffect, useState, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useScreenshot } from 'use-react-screenshot';
import "./form.css";
import Navbar from '../Navbar/Navbar';
import Canvas from './Canvas';
import axios from 'axios';

export default function Form() {
    const location = useLocation();
    const formFields = useMemo(() => ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], []);
    axios.defaults.withCredentials = true;

    const [formData, setFormData] = useState({});
    const [image, takeScreenshot] = useScreenshot();
    const [data, setData] = useState([]);

    console.log(data[0]);

    const [searchParams] = useSearchParams(
        {
            id: location?.state?.id,
        }
    )

    const id = searchParams.get('id');

    const ref = useRef(null);

    useEffect(() => {
        const getResult = () => {
            axios.get("http://localhost:8000/getDocuments/id/two", { params: { id: id } }).then((response) => {
                setData(response.data.result[0]);
            }).catch(error => {
                console.error('AxiosError:', error);
            });
        }
        getResult();
    }, [id])

    console.log(data);

    useEffect(() => {
        const initialFormData = {};
        formFields.forEach(field => {
            initialFormData[field] = '';
        });
        setFormData(initialFormData);
    }, [formFields]);

    const handleChange = (field, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    console.log(formData);
    const getImage = async () => {
        try {
            const img = await takeScreenshot(ref.current);
            handleSave(img);
        } catch (error) {
            console.error("Error while taking screenshot:", error);
        }
    };

    const handleSave = (img) => {
        axios.post('http://localhost:8000/', {
            ...formData,
            url:data[0]?.url,
            img,
            id:id
        })
            .then(function (response) {
                if(response.data.result) {
                    alert("Signed Succesfully");
                    window.location.reload();
                } else {
                    alert("error uploading");
                }
            })
            .catch(function (error) {
                console.error("Error during POST request:", error);
            });
    };

    return (
        <>
            <Navbar />
            <div className="form-parent-container">
                <div className="form-container">
                    {formFields.slice(0, data[0]?.fields).map(field => (
                        <div key={field} className="form-field">
                            <label htmlFor={field}>{field}:  </label>
                            <input
                                type="text"
                                id={field}
                                value={formData[field]}
                                onChange={(e) => handleChange(field, e.target.value)}
                            />
                        </div>
                    ))}
                    <div className="signature-container">
                        <label>Signature</label>
                        <div style={{ border: 'solid 1px' }} className="canvas-container">
                            <div ref={ref}>
                                <Canvas />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={getImage}>Save</button>
                </div>

                <img
                    src={image}
                    className="img-fluid rounded-top"
                    alt=""
                />
            </div>
        </>
    );
}