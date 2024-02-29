import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
            axios.get("https://imshrserver.ims.lol/getDocuments/id", { params: { id: id } }).then((response) => {
                setData(response.data.result[0]);
            }).catch(error => {
                console.error('AxiosError:', error);
            });
        }
        getResult();
    }, [id])

    console.log('docu');
    console.log(data[0]?.url);

    function onDocumentLoadSuccess({ numPages, pdf }) {
        setNumPages(numPages);
    }

    const handleButtonClick = (url) => {
        // URL of the page you want to open in the new tab
        const newTabUrl = url;

        // Open a new tab with the specified URL
        window.open(newTabUrl, 'PopupWindow', 'width=1000,height=1000');
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p
                style={{ cursor: 'pointer', color: '#3498db', textDecoration: 'underline' }}
                onClick={() => handleButtonClick(data[0]?.url)}
            >
                Click here to read the contract
            </p>
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