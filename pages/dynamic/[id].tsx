import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
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

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
    const movie = await MovieService.getMovieById(Number(params?.id));
    return {
      props: { movie },
    }
}