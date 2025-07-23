'use client'

import { UploadFileResponse, useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";

// The 'buttonClickedState' prop is no longer needed
type UploadComponentProps = {
    imageUploaderApi: 'imageUploader',
    onUploadComplete: (res: UploadFileResponse<{ uploadedBy: string }>[]) => void;
    onUploadError: (e: any) => void;
    onUploadBegin: (fileName: string) => void;
};

export default function UploadThingMultipleUploader(props: UploadComponentProps) {
    const { imageUploaderApi, onUploadBegin, onUploadComplete, onUploadError } = props;
    const [files, setFiles] = useState<File[]>([]);

    const { startUpload, isUploading } = useUploadThing(
        imageUploaderApi,
        {
            onClientUploadComplete: (res) => {
                onUploadComplete(res);
                setFiles([]); // Clear the file list on successful upload
            },
            onUploadError: onUploadError,
            onUploadBegin: onUploadBegin,
        },
    );

    const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (!selectedFiles) return;

        const newFiles = Array.from(selectedFiles);
        
        // Even though we're uploading immediately, updating state can be useful for UI feedback
        setFiles(newFiles); 

        // Start the upload immediately with the newly selected files
        startUpload(newFiles);
    };

    return (
        <div>
            <label
                htmlFor="fileInput"
                className="relative inline-block border p-2 rounded-md cursor-pointer font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
            >
                {/* Use the `isUploading` state for user feedback */}
                {isUploading ? (
                    'Uploading...'
                ) : files.length > 0 ? (
                    // Display names of files being uploaded
                    <>
                        {files.map((f, i) => (
                            <p key={i}>{f.name}</p>
                        ))}
                    </>
                ) : (
                    'Choose file(s) to upload'
                )}
                
                <input
                    id="fileInput"
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={handleFilesChange}
                    // Disable the input while an upload is in progress
                    disabled={isUploading}
                />
            </label>
            {/* The upload button is no longer needed */}
        </div>
    );
}