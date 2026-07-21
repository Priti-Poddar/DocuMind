import { useRef } from "react";
import { Upload } from "lucide-react";
import { uploadDocument } from "../../services/document.service";

const UploadButton = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    console.log("Selected:", file.name);

    try {
      const res = await uploadDocument(file);
      console.log("Upload success:", res);
      toast.success("Document uploaded.");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed.");
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={handleFileChange}
      />

      <button
        onClick={handleClick}
        className="w-full bg-violet-600 hover:bg-violet-700 rounded-lg py-3 flex items-center justify-center gap-2"
      >
        <Upload size={18} />
        Upload PDF
      </button>
    </>
  );
};

export default UploadButton;
