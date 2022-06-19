import { IMovie } from "../typings";
import axios from 'axios';

interface IMovieApiResults {
    results: IMovie[];
}

export interface IHomeMovieData {
    netflixOriginals: IMovie[];
    trendingNow: IMovie[];
    topRated: IMovie[];
    actionMovies: IMovie[];
    comedyMovies: IMovie[];
    horrorMovies: IMovie[];
    romanceMovies: IMovie[];
    documentaries: IMovie[];
}

class MovieService {
    private static _BASE_URL = 'https://api.themoviedb.org/3';
    private static _BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';
    private static _API_KEY = process.env.NEXT_PUBLIC_MOVIE_API;

    private static async getTrending(): Promise<IMovieApiResults> {
        return (await axios.get<IMovieApiResults>(`${this._BASE_URL}/trending/all/week?api_key=${this._API_KEY}&language=en-US`)).data;
    }

    private static async getNetflixOriginals(): Promise<IMovieApiResults> {
        return (await axios.get<IMovieApiResults>(`${this._BASE_URL}/discover/movie?api_key=${this._API_KEY}&with_networks=213`)).data;
    }

    private static async getTopRated(): Promise<IMovieApiResults> {
        return (await axios.get<IMovieApiResults>(`${this._BASE_URL}/movie/top_rated?api_key=${this._API_KEY}&language=en-US`)).data;
    }

    private static async getActionMovies(): Promise<IMovieApiResults> {
        return (await axios.get<IMovieApiResults>(`${this._BASE_URL}/discover/movie?api_key=${this._API_KEY}&language=en-US&with_genres=28`)).data;
    }

    private static async getComedyMovies(): Promise<IMovieApiResults> {
        return (await axios.get<IMovieApiResults>(`${this._BASE_URL}/discover/movie?api_key=${this._API_KEY}&language=en-US&with_genres=35`)).data;
    }
    
    private static async getHorrorMovies(): Promise<IMovieApiResults> {
        return (await axios.get<IMovieApiResults>(`${this._BASE_URL}/discover/movie?api_key=${this._API_KEY}&language=en-US&with_genres=27`)).data;
    }
    
    private static async getRomanceMovies(): Promise<IMovieApiResults> {
        return (await axios.get<IMovieApiResults>(`${this._BASE_URL}/discover/movie?api_key=${this._API_KEY}&language=en-US&with_genres=10749`)).data;
    }
    
    private static async getDocumentaries(): Promise<IMovieApiResults> {
        return (await axios.get<IMovieApiResults>(`${this._BASE_URL}/discover/movie?api_key=${this._API_KEY}&language=en-US&with_genres=99`)).data;
    }

    public static async getHomeMovieData(): Promise<IHomeMovieData> {
        try {
            const [
                netflixOriginals,
                trendingNow,
                topRated,
                actionMovies,
                comedyMovies,
                horrorMovies,
                romanceMovies,
                documentaries,
              ] = await Promise.all([
                this.getTrending(),
                this.getNetflixOriginals(),
                this.getTopRated(),
                this.getActionMovies(),
                this.getComedyMovies(),
                this.getHorrorMovies(),
                this.getRomanceMovies(),
                this.getDocumentaries()
            ])

            return {
                netflixOriginals: netflixOriginals.results,
                trendingNow: trendingNow.results,
                topRated: topRated.results,
                actionMovies: actionMovies.results,
                comedyMovies: comedyMovies.results,
                horrorMovies: horrorMovies.results,
                romanceMovies: romanceMovies.results,
                documentaries: documentaries.results,
            }
        } catch(err) {
            throw err;
        }
    }

    public static imageUrl(movie: IMovie): string {
        return `${this._BASE_IMAGE_URL}${movie.backdrop_path || movie.poster_path}`
    }
}
export default MovieService;