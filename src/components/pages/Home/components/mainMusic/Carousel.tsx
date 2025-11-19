import './Carousel.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

interface CarouselProps {
    children: React.ReactNode | React.ReactNode[];
}

function Carousel({ children }: CarouselProps ){

    const childArray = Array.isArray(children) ? children : [children];

    return (
            <Splide
                options={{
                    perPage: 3,
                    focus: 0,
                    autoWidth: true,
                    pagination: false,
                    omitEnd: true,
                }}
            aria-label="Mi carrusel de musica"
        >
            {childArray.map((child, index) => (
                <SplideSlide key={index}>{child}</SplideSlide>
            ))}
        </Splide>
)};


export default Carousel;


