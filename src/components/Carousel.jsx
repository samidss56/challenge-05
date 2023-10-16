import { Carousel } from "react-bootstrap";

const HomeCarousel = () => {
  return (
    <Carousel className="carousel" controls={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/8I37NtDffNV7AZlDa7uDvvqhovU.jpg"
          alt="First slide"
        />
        <Carousel.Caption className="Movie-caption">
          <h3>Avatar: The Way of Water</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg"
          alt="First slide"
        />
        <Carousel.Caption className="Movie-caption">
          <h3>Black Adam</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg"
          alt="First slide"
        />
        <Carousel.Caption className="Movie-caption">
          <h3>Black Panther: Wakanda Forever</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
