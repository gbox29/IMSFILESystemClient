import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import ap from "./Admin_programmer.pdf";

export default function Render() {
    axios.defaults.withCredentials = true;
    const location = useLocation();
    const [numPages, setNumPages] = useState();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams(
        {
            id: location?.state?.id,
        }
    )

    const id = searchParams.get('id');

    useEffect(() => {
        const getResult = () => {
            axios.get("https://imshrserver.ims.lol/getDocuments/id", {params:{id:id}}).then((response) => {
                setData(response.data.result[0]);
            }).catch(error => {
                console.error('AxiosError:', error);
            });
        }
        getResult();
    }, [id])

    console.log('docu');
    console.log(data[0]);

    function onDocumentLoadSuccess({ numPages, pdf }) {
        setNumPages(numPages);
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Document file={data[0]?.url} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from({ length: numPages }, (_, i) => i + 1)
                    .map((page) => (
                        <Page key={page} pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} />
                    ))}
            </Document>
            <div style={{ marginTop: '10px' }}>
                <button onClick={() => {
                    navigate(`/form?id=${id}`, { state: { id: id } });
                }}>Click here to sign</button>
            </div>
        </div>
    );
}