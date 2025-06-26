'use client'

import { UploadFileResponse, useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";

type UploadComponentProps = {
    buttonClickedState: boolean
    imageUploaderApi: 'imageUploader',
    onUploadComplete: (res: UploadFileResponse<{ uploadedBy: string }>[]) => void;
    onUploadError: (e: any) => void;
    onUploadBegin: (fileName: string) => void;
};

export default function UploadThingMultipleUploader(props: UploadComponentProps) {
    const { imageUploaderApi, onUploadBegin, onUploadComplete, onUploadError, buttonClickedState } = props;
    const [files, setFiles] = useState<File[]>([]);

    const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
        const newImages = Array.from(files).map((file) => file)
        setFiles((prevState) => [...prevState, ...newImages]);
    };

    const { startUpload } = useUploadThing(
        imageUploaderApi,
        {
            onClientUploadComplete: (res: UploadFileResponse<{ uploadedBy: string }>[]) => {
                onUploadComplete(res);
                setFiles([]);
            },
            onUploadError: onUploadError,
            onUploadBegin: onUploadBegin,
        },
    );
    return (
        <div>
            <label
                htmlFor="fileInput"
                className="relative inline-block border p-2 rounded-md cursor-pointer font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
            >
                {files.length > 0 ? <>
                    {files.map((f, i) => {
                        return <p key={i}>{f.name}</p>
                    })}
                </> : 'Choose file'}
                <input
                    id="fileInput"
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={handleFilesChange}
                />
            </label>
            <div>
                {files.length > 0 && (
                    <button
                        className="mt-4 bg-blue-600 text-white  rounded-md w-max py-2 px-3 flex items-center justify-center"
                        onClick={(e:any) => {
                            e.preventDefault();
                            startUpload(files)
                        }}>
                        {buttonClickedState ? 'uploading....' : `Upload ${files.length} files`}
                    </button>
                )}
            </div>
        </div>
    );
}