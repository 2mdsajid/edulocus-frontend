import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();



export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();


export type UploadFileResponse<TServerOutput> = {
  name: string
  size: number
  key: string
  url: string
  customId: string | null
  // The data returned from the `onUploadComplete` callback on
  // the file route. Note that if `RouteOptions.awaitServerData`
  // isn't enabled this will be `null`.
  serverData: TServerOutput
}
