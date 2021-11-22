import axios from "axios";
import constants from "./Constants";

const API_KEY = process.env.API_KEY;
const baseURL = "https://api.themoviedb.org/3";

export const getList = async ({ path, querry }) => {
  let url = `${baseURL}${path}?api_key=${API_KEY}`;
  if (querry) url += querry;

  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
