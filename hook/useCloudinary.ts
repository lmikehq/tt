import { useState } from "react";
import crypto from "crypto";
import axios from "axios";
const useCloudinaryUpload = ({
  presets,
}: {
  presets: { publicId: string; folder: string };
}) => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [progress, setProgress] = useState(0);
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string;
  const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_SECRET_KEY as string;

  const uploadImage = async ({ file }: { file: any }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("folder", presets.folder);
    formData.append("upload_preset", "uy4br1wh");

    setLoading(true);

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/thrillers-travels/image/upload",
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          console.log(loaded);

          if (!total) return;
          const percentCompleted = Math.round((loaded * 100) / total);
          console.log(percentCompleted);
          setProgress(percentCompleted);
        },
      }
    );

    setLoading(false);
    return response?.data.secure_url;
  };

  // const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
  // const regex = /\/v\d+\/([\w-]+\/[\w-]+\.\w+)/;

  const getPublicIdFromUrl = (url: string) => {
    const regex = /\/v\d+\/\d+-files\/([\w-]+)(?:\.\w+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getFolderFromUrl = (url: string) => {
    const regex = /\/v\d+\/(\d+[-\w]+)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  const generateSHA1 = (data: any) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
  };

  const generateSignature = (publicId: string, apiSecret: string) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };
  const deleteImage = async ({ imageUrl }: { imageUrl: string }) => {
    const publicId = getPublicIdFromUrl(imageUrl);

    const timestamp = new Date().getTime();
    const signature = generateSHA1(
      generateSignature(publicId ?? "", apiSecret)
    );
    const url = `https://api.cloudinary.com/v1_1/thrillers-travels/image/destroy`;

    try {
      setDeleting(true);

      const response = await axios.post(url, {
        public_id: publicId,
        signature: signature,
        api_key: apiKey,
        timestamp: timestamp,
        folder: getFolderFromUrl(imageUrl),
      });
      setDeleting(false);

      console.error(response);
    } catch (error) {
      console.error(error);
      setDeleting(false);
      throw error;
    }
  };

  return { loading, uploadImage, progress, deleting, deleteImage };
};

export default useCloudinaryUpload;
