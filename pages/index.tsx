import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/banner'
import Header from '../components/header'
import MovieService, { IHomeMovieData } from '../services/movies.service'

interface IHomeProps {
  movieData: IHomeMovieData;
}

const Home: React.FC<IHomeProps> = ({ movieData }) => {
  return (
    <div className='relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
          <Banner netflixOriginals={movieData.netflixOriginals} />
          <section>
            {/* Rows */}
            {/* Rows */}
            {/* Rows */}
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