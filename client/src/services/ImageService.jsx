import { httpService } from "./HttpService";

const BASE_URL = "images/";

const upload = async (files) => {
  console.log("service", files);
  const fileName = await httpService.post(BASE_URL + "upload", { files });
  return fileName;
};

const uploadByLink = async (link) => {
  const fileName = await httpService.post(BASE_URL + "uploadByLink", { link });
  return fileName;
};

export const ImageService = {
  upload,
  uploadByLink,
};
