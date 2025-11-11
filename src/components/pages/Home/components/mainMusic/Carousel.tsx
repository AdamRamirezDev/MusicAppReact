import './Carousel.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';


function Carousel({ children }: { children: React.ReactNode[]}){

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
            {children.map((child: React.ReactNode, index: number) => (
                <SplideSlide key={index}>{child}</SplideSlide>
            ))}
        </Splide>
)};


export default Carousel;