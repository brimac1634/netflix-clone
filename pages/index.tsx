import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/banner'
import Header from '../components/header'
import Row from '../components/row'
import MovieService, { IHomeMovieData } from '../services/movies.service'

interface IHomeProps {
  movieData: IHomeMovieData;
}

const Home: React.FC<IHomeProps> = ({ movieData }) => {
  return (
    <div className='relative h-screen bg-gradient-to-b lg:h-[140vh]'>
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
          <Banner netflixOriginals={movieData.netflixOriginals} />
          <section className='md:space-y-24'>
            <Row title='Trending Now' movies={movieData.trendingNow} />
            <Row title='Top Rated' movies={movieData.topRated} />
            <Row title='Action Thrillers' movies={movieData.actionMovies} />

            <Row title='Comedies' movies={movieData.comedyMovies} />
            <Row title='Scary Movies' movies={movieData.horrorMovies} />
            <Row title='Romance Movies' movies={movieData.romanceMovies} />
            <Row title='Documentaries' movies={movieData.documentaries} />
          </section>
      </main> 
      {/* Modal */}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {

  const movieData = await MovieService.getHomeMovieData();

  return {
    props: {
      movieData
    }
  }

}