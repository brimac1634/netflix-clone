import Image from "next/image";
import MovieService from "../services/movies.service";
import { IMovie } from "../typings";

interface ThumbnailProps {
    movie: IMovie
}
 
const Thumbnail: React.FC<ThumbnailProps> = ({ movie }) => {
    return ( 
        <div className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'>
            <Image 
                src={MovieService.imageThumbnailUrl(movie)}
                layout='fill'
                className='rounded-sm object-cover md:rounded'
            />
        </div>
     );
}
 
export default Thumbnail;