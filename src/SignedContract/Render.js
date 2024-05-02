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
    const [data, setData] = useState();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams(
        {
            id: location?.state?.id,
        }
    )

    const id = searchParams.get('id');

    useEffect(() => {
        const getResult = async () => {
            try {
                const response = await axios.get("http://localhost:8000/getContract/id", {
                    params: { id: id },
                    responseType: 'arraybuffer' // Set the responseType to 'arraybuffer'
                });
                if (response.status === 200) {
                    const blob = new Blob([response.data], { type: 'application/pdf' }); // Create a Blob from the array buffer
                    const pdfUrl = URL.createObjectURL(blob);
                    setData(pdfUrl);
                } else {
                    // Handle error
                }
            } catch (error) {
                console.error('AxiosError:', error);
            }
        }
        getResult();
    }, [id]);
    
    console.log(data);
    

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
            <a href={data} download>download</a>
            <p
                style={{ cursor: 'pointer', color: '#3498db', textDecoration: 'underline' }}
                onClick={() => handleButtonClick(data)}
            >
                Click here to read the contract
            </p>
            <Document file={data} onLoadSuccess={onDocumentLoadSuccess} noDataLength>
                {Array.from({ length: numPages }, (_, i) => i + 1)
                    .map((page) => (
                        <Page key={page} pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} />
                    ))}
            </Document>
            <div style={{ marginTop: '10px' }}>
                {/* <button onClick={() => {
                    navigate(`/form?id=${id}`, { state: { id: id } });
                }}>Click here to sign</button> */}
            </div>
        </div>
    );
}
