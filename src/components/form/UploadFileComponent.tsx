"use client";

import { useUploadFilesMutation } from "@/services/upload";
import { useState } from "react";

export default function UploadMultiple() {
    const [files, setFiles] = useState<File[]>([]);

    const [uploadFiles, { isLoading, isSuccess, isError }] =
        useUploadFilesMutation();

    const handleUpload = async () => {
        if (files.length === 0) return;

        try {
            const res = await uploadFiles(files).unwrap();
            console.log("Uploaded:", res);
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    return (
        <div className="p-4 space-y-3">
            <input
                type="file"
                multiple
                onChange={(e) => {
                    const selected = Array.from(e.target.files || []);
                    setFiles(selected);
                }}
            />

            <button
                onClick={handleUpload}
                disabled={isLoading || files.length === 0}
                className="px-4 py-2 bg-green-600 text-white"
            >
                {isLoading ? "Uploading..." : "Upload Files"}
            </button>

            {isSuccess && <p>Upload success </p>}
            {isError && <p>Upload failed </p>}

            <div>
                <h3>Selected files:</h3>
                <ul>
                    {files.map((f, i) => (
                        <li key={i}>{f.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}