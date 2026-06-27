"use client";

import { useUploadFileMutation } from "@/services/upload";
import Image from "next/image";
import React, { useState } from "react";

export default function UploadComponent() {
    const [uploadFiles, { isLoading }] = useUploadFileMutation();
    const [imageUrl, setImageUrl] = useState<string>("");

    const handleUpload = async (files: File) => {
        try {
            const result = await uploadFiles(files).unwrap();

            // ✅ If API returns single object (most likely)
            setImageUrl(result.location);

            console.log("Uploaded:", result);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file); // ✅ single File
                }}
            />

            {isLoading && <p>Uploading...</p>}

            {imageUrl && (
                <Image height={200} src={imageUrl} alt="Uploaded" width={200} />
            )}
        </div>
    );
}