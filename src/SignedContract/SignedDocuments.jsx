import { pdfjs } from 'react-pdf';
import Navbar from "../Navbar/Navbar";
import Render from './Render';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


export default function SignedDocuments () {
    return (
        <>
            <Navbar />
            <Render />
        </>
    );
}