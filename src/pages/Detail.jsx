import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Carousel } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { Footer } from "../components/Footer";
import NavbarComponent from "../components/Navbar";

const baseUrl = import.meta.env.VITE_APP_BASEURL;
const apiKey = import.meta.env.VITE_APP_APIKEY;

function Detail() {
  const [detailMovie, setDetailMovie] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const params = useParams();

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  useEffect(() => {
    async function getDetailMovie() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${baseUrl}/movie/${params.id}?api_key=${apiKey}&language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDetailMovie(response.data);
      } catch (error) {
        alert(error);
      }
    }

    getDetailMovie();
  }, [params]);

  return (
    <>
      <NavbarComponent onSearchResults={handleSearchResults} />

      <Carousel className="carousel-detail" controls={false}>
        <Carousel.Item>
          <img
            className="Carousel-img d-block w-100"
            src={`https://image.tmdb.org/t/p/original${detailMovie?.backdrop_path}`}
            alt="First slide"
          />
          <Carousel.Caption className="Movie-caption-detail">
            <div
              className="Movie-wrapper-detail mb-2 mx-1"
              key={detailMovie?.id}
            >
              <img
                className="Movie-image mt-4"
                src={`https://image.tmdb.org/t/p/original${detailMovie?.poster_path}`}
                alt=""
                style={{ width: "185px", borderRadius: "10px" }}
              />
            </div>
            <h2 className="Movie-caption-title">{detailMovie?.title}</h2>
            <p className="Movie-genres">
              {detailMovie?.genres &&
                detailMovie?.genres?.length > 0 &&
                detailMovie?.genres?.map((genre, i) => {
                  return i === detailMovie?.genres.length - 1
                    ? genre.name
                    : `${genre.name}, `;
                })}
            </p>
            <p className="Movie-caption-text">{detailMovie?.overview}</p>
            <p className="Movie-rate">
              <StarFill className="Icon-star" />
              {detailMovie?.vote_average
                ? detailMovie.vote_average.toFixed(1)
                : "-"}{" "}
              / 10
            </p>
            <Button className="Movie-caption-button" variant="outline-danger">
              Watch Trailer
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {searchResults.length > 3 && (
        <>
          <h3 style={{ marginLeft: "6.5rem", marginTop: "1rem" }}>
            <strong>Search Movie</strong>{" "}
          </h3>
          <div className="Movie-container mx-4 my-4">
            {searchResults.map((movie, i) => (
              <Link to={`/detail/${movie.id}`} key={i}>
                <div className="Movie-wrapper mb-4 mx-1" key={i}>
                  <img
                    className="Movie-image"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt=""
                    style={{ width: "200px", borderRadius: "10px" }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <Footer />
    </>
  );
}

export default Detail;