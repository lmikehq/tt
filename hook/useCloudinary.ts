import { useState } from "react";
import axios from "axios";
const useCloudinaryUpload = (preset: any) => {
  const [loading, setLoading] = useState(false);

  const uploadImage = async (image: any) => {
    const formData = new FormData();
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string;
    formData.append("file", image);
    formData.append("api_key", apiKey);
    formData.append("folder", preset.folder);
    formData.append("upload_preset", "uy4br1wh");

    setLoading(true);

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/thrillers-travels/image/upload",
      formData
    );

    setLoading(false);
    return response?.data.secure_url;
  };

  return { loading, uploadImage };
};

export default useCloudinaryUpload;
