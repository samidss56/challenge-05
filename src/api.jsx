import axios from "axios";

const apiKey = import.meta.env.VITE_APP_APIKEY;
const baseUrl = import.meta.env.VITE_APP_BASEURL;

// export const getMovieList = async () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     throw new Error("Token not found. Please log in.");
//   }
//   const movie = await axios.get(
//     `https://shy-cloud-3319.fly.dev/api/v1/movie/popular`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return movie.data.results;
// };

export const searchMovie = async (q) => {
  const search = await axios.get(
    `${baseUrl}/search/movie?query=${q}&page=1&api_key=${apiKey}`
  );
  return search.data;
};
