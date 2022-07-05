import { GetStaticPropsContext } from "next";
import MovieService from "../../services/movies.service";
import { IMovie } from "../../typings";

interface ProgramProps {
    movie: IMovie
}
 
const Program: React.FC<ProgramProps> = ({ movie }) => {
    return ( 
        <div>{movie.title}</div>
    );
}
 
export default Program;

export async function getStaticPaths() {
    const movieIds = await MovieService.getAllMovieIds();
    const paths = movieIds.map((id) => ({
        params: { id: id.toString() },
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ id: string }>) {
    const movie = await MovieService.getMovieById(Number(params?.id));
    return { props: { movie } }
}