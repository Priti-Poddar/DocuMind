import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

const DropZone = ({ onFile }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length) {
        onFile(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2
        border-dashed
        rounded-2xl
        p-10
        text-center
        cursor-pointer
        transition-all
        ${
          isDragActive
            ? "border-violet-500 bg-violet-500/10"
            : "border-zinc-700 hover:border-violet-500"
        }
      `}
    >
      <input {...getInputProps()} />

      <UploadCloud className="mx-auto mb-4" size={48} />

      {isDragActive ? (
        <>
          <h2 className="text-lg font-semibold">Release to upload</h2>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold">Drop your PDF here</h2>

          <p className="text-zinc-400 mt-2">or click to browse</p>

          <p className="text-xs text-zinc-500 mt-4">PDF only • Max 20 MB</p>
        </>
      )}
    </div>
  );
};

export default DropZone;
