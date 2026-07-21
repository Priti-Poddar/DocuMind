import api from "./api";

export const uploadDocument = async (file) => {
  const formData = new FormData();

  formData.append("document", file);

  const response = await api.post("/documents", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getDocuments = async () => {
  const response = await api.get("/documents");

  return response.data;
};
