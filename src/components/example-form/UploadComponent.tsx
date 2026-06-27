"use client";

import { useUploadFilesMutation } from "@/services/upload";
import { useState } from "react";

export default function UploadMultiple() {
    const [files, setFiles] = useState<File[]>([]);

    const [uploadFiles, { isLoading, isSuccess, isError, data }] =
        useUploadFilesMutation();

    const handleUpload = async () => {
        if (files.length === 0) return;

        try {
            const result = await uploadFiles(files).unwrap();
            console.log("Upload success:", result);
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    return (
        <div className="p-4 space-y-4">
            {/* FILE INPUT */}
            <input
                type="file"
                multiple
                onChange={(e) => {
                    const selected = Array.from(e.target.files || []);
                    setFiles(selected);
                }}
            />

            {/* UPLOAD BUTTON */}
            <button
                onClick={handleUpload}
                disabled={isLoading || files.length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded"
            >
                {isLoading ? "Uploading..." : "Upload Files"}
            </button>

            {/* STATUS */}
            {isSuccess && <p className="text-green-600">Upload success ✅</p>}
            {isError && <p className="text-red-600">Upload failed ❌</p>}

            {/* PREVIEW FILE LIST */}
            <div>
                <h3 className="font-bold">Selected files:</h3>
                <ul className="list-disc ml-5">
                    {files.map((file, i) => (
                        <li key={i}>{file.name}</li>
                    ))}
                </ul>
            </div>

            {/* API RESPONSE */}
            {data && (
                <pre className="bg-gray-100 p-2 rounded">
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    );
}