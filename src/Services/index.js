import axios from 'axios';

const BASE_URL = "https://api.themoviedb.org/3/";
const api_key = "?api_key=3a5f9096f90b10cf6a5223dd20e06429";

const Get = (path, params) => {
    const api = axios.create({ baseURL: BASE_URL });
    const promise = new Promise ((resolve, reject) => {
        api.get(`${BASE_URL}${path}${api_key}`, { params })
        .then((result) => {
            resolve(result.data);
            // console.log('cek result: ', result.data);
        }, (err) => {
            reject(err);
        })
    })
    // console.log('cek promise : ', promise);
    return promise;
}

const getMovies = (params) => Get(`movie/${params}`);
const searchMovie = (params) => Get('search/movie', params);
const getMovie = (id) => Get(`movie/${id}`);
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

const API = {
    getMovies,
    searchMovie,
    getMovie,
    getImage
}

export default API;