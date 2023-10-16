import { useEffect, useState } from "react";
import axios from "axios";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import HomeCarousel from "../components/Carousel";
import NavbarComponent from "../components/Navbar";
import { ArrowRight } from "react-bootstrap-icons";
import { Row, Col } from "react-bootstrap";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [userHasToken, setUserHasToken] = useState(false);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_URL;

  const getPopularMovies = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUserHasToken(false);
        setLoading(false);
        return;
      }

      const response = await axios.get(`${baseUrl}/api/v1/movie/popular`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPopularMovies(response.data.data);
      setUserHasToken(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      setUserHasToken(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  const PopularMovieList = () => {
    if (loading) {
      return <div className="text-black">Loading...</div>;
    }

    if (!popularMovies || popularMovies.length === 0) {
      return <div className="text-black">No movies to display.</div>;
    }

    const moviesToDisplay =
      searchResults.length > 0 ? searchResults : popularMovies;

    return (
      <div className="Movie-container">
        {moviesToDisplay.map((movie, i) => (
          <Link to={`/detail/${movie.id}`} key={i}>
            <div className="Movie-wrapper mb-4 mx-1" key={i}>
              <img
                className="Movie-image"
                src={`${import.meta.env.VITE_APP_BASEIMGURL}/${
                  movie.poster_path
                }`}
                alt={movie.title}
                style={{ width: "200px", borderRadius: "10px" }}
              />
            </div>
          </Link>
        ))}
      </div>
    );
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <>
      <NavbarComponent onSearchResults={handleSearchResults} />

      <HomeCarousel />

      {userHasToken ? (
        <>
          <div className="App">
            <header className="App-header d-flex">
              <Row>
                <Col md={6}>
                  <h3
                    className="text-start mt-4"
                    style={{ marginLeft: "6.5rem", color: "black" }}
                  >
                    <strong>Popular Movies</strong>
                  </h3>
                </Col>
                <Col md={6}>
                  <h6
                    className="text-end mt-4 align-content-center text-danger"
                    style={{ marginRight: "6.5rem" }}
                  >
                    See All Movies
                    <ArrowRight className="icon-arrow"></ArrowRight>
                  </h6>
                </Col>
              </Row>

              <br />
              <PopularMovieList />
            </header>
          </div>
        </>
      ) : (
        <div style={{ height: "3rem" }}>
          <h3 className="text-dark text-center mt-3">
            <strong>Please log in to access the movie list.</strong>
          </h3>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Home;
