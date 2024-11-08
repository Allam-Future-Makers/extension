import ky from "ky";
import {
  DictionaryResponse,
  IrabResponse,
  MSAResponse,
  TashkeelResponse,
} from "./types";

const kyInstance = ky.create({
  prefixUrl: "https://allam.elyra.games/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000000,
});

const getIrab = (paragraph: string) => {
  return kyInstance.post<IrabResponse>("irab", { json: { paragraph } }).json();
};

const getMSA = (paragraph: string) => {
  return kyInstance.post<MSAResponse>("to_msa", { json: { paragraph } }).json();
};

const getTashkeel = (sentence: string) => {
  return kyInstance
    .post<TashkeelResponse>("tashkeel", { json: { sentence } })
    .json();
};

const getMo3gam = (word: string) => {
  return kyInstance
    .post<DictionaryResponse>("mo3gam", {
      json: { word: word },
    })
    .json();
};

export const apiService = {
  getIrab, //only sentences
  getMSA,
  getTashkeel,
  getMo3gam, //words only
};
