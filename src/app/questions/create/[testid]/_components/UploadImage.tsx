// components/UploadImage.tsx
'use client'

// Ensure this path is correct for your UploadThing uploader
import UploadThingMultipleUploader from '@/components/uploadthing/uploadthingMultipleUploader'
import React, { useState } from 'react'
import { UploadFileResponse } from '@/lib/uploadthing';
import { UploadThingError } from 'uploadthing/server';
import { toast } from '@/hooks/use-toast';
import { TBaseImages } from '@/lib/schema/questions.schema'; // Import TBaseImages

type Props = {
    // New props to specify which field this uploader is for
    field: keyof TBaseImages;
    // New callback to send the uploaded URL back to the parent
    onImageUploaded: (field: keyof TBaseImages, url: string) => void;
    // Removed 'images' and 'SetImages' as this component now handles single field uploads
}

const UploadImage = ({ field, onImageUploaded }: Props) => {
    const [isButtonClicked, setIsButtonClicked] = useState(false)

    const onUploadComplete = (res: UploadFileResponse<{ uploadedBy: string }>[]) => {
        if (res && res.length > 0) {
            const uploadedUrl = res[0].url; // Assuming only one file is uploaded at a time
            onImageUploaded(field, uploadedUrl); // Pass the field and URL back
            toast({
                variant: "success",
                title: "Image Uploaded",
                description: 'Upload complete.',
            })
        } else {
            toast({
                variant: "destructive",
                title: "Upload Error",
                description: "No image URL received.",
            });
        }
        setIsButtonClicked(false)
    };

    const onUploadError = (error: UploadThingError) => {
        console.error("UploadThing error:", error);
        toast({
            variant: "destructive",
            title: "Image Upload Error",
            description: error.message,
        })
        setIsButtonClicked(false)
    };

    const onUploadBegin = (fileName: string) => {
        setIsButtonClicked(true)
    };

    return (
        <div className='flex flex-col items-center justify-center p-4 border border-dashed rounded-md'>
            <p className="text-sm text-gray-500 mb-2">Upload image for {field.toUpperCase()}</p>
            {/* Assuming UploadThingMultipleUploader can handle single file upload or you configure it to */}
            <UploadThingMultipleUploader
                buttonClickedState={isButtonClicked}
                imageUploaderApi='imageUploader'
                onUploadBegin={onUploadBegin}
                onUploadComplete={onUploadComplete}
                onUploadError={onUploadError}
                // You might need to add a `multiple={false}` prop here if your uploader supports it for single file selection
            />
        </div>
    )
}

export default UploadImage;