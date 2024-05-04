import { default as axios } from 'axios';

const protocol = 'http';
const domainName = '192.168.100.4'; //lemuel casa 
// const domainName = '172.16.32.72'; //lemuel
// const domainName = 'localhost';// carlos

export const Api = axios.create({
 baseURL: `${protocol}://${domainName}/Mobile/backend/public/api/`, // lemuel
});
export const ApiUrl = `http://${domainName}/Mobile/backend/public/api/`;  //lemuel
export const Img = `http://${domainName}/Mobile/backend/public/storage/Images/`; //lemuel



// export const Api = axios.create({
//   baseURL: `${protocol}://${domainName}/1.75/backend/public/api/`, // carlos
// });
// export const ApiUrl = 'http://localhost/1.75/backend/public/api/'; //carlos
// export const Img = "http://localhost/1.75/backend/public/storage/" // carlos

export interface FoodResponse {
  id: number;
  Name: string;
  Image: string;
  Description: string;
  Price: number;
  idFoodGroupFK: number;
}

