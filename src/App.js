import { Route, Routes } from "react-router-dom";
import SignedTableMain from "./SignedDocumentTable/SignedTableMain";
import SignedDocuments from "./SignedDocuments/SignedDocuments";
import Form from "./Form/Form";
import DocumentTableMain from "./UploadDocument/DocumentTableMain";
import Login from "./Auth/Login";

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signed" element={<SignedTableMain />} />
        <Route path="/content" element={<SignedDocuments />} />
        <Route path="/form" element={<Form />} />
        <Route path="/documents" element={<DocumentTableMain />} /> 
      </Routes>
    </div>
  );
}