import { createContext, useContext, useState } from "react";

const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  return (
    <DocumentContext.Provider
      value={{
        documents,
        setDocuments,
        selectedDocument,
        setSelectedDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => useContext(DocumentContext);
