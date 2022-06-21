import { InformationCircleIcon, PlayIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import MovieService from "../services/movies.service";
import { IMovie } from "../typings";

interface BannerProps {
    netflixOriginals: IMovie[];
}
 
const Banner: React.FC<BannerProps> = ({ netflixOriginals }) => {
    const [movie, setMovie] = useState<IMovie | undefined>(undefined);
    
    useEffect(() => {
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
    }, [netflixOriginals])

    return ( 
        <div className='flex flex-col space-y-2 py-16 md:space-y-4 md:justify-end lg:h-[65vh] lg:pb-12'>
            <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
                {
                    movie &&
                    <Image 
                        src={MovieService.imageUrl(movie)} 
                        layout='fill' 
                        objectFit='cover'
                    />
                }
            </div>
            <h1 className='font-bold text-2xl md:text-4xl lg:text-7xl'>{movie?.title || movie?.name || movie?.original_name}</h1>
            <p className='max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-xl lg:text-2xl'>{movie?.overview}</p>
            <div className='flex space-x-3'>
                <button className='banner-button bg-white text-black'><PlayIcon className='h-5 w-5 text-black md:h-8 md:w-8' /> Play</button>
                <button className='banner-button bg-[gray]/70'>More Info <InformationCircleIcon className='w-5 h-5 md:w-8 md:h-8' /></button>
            </div>
        </div>
     );
}
 
export default Banner;