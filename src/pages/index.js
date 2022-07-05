import Head from 'next/head';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import FilterBox from '../components/FilterBox';
import DataBox from '../components/DataBox';


export default function Home({filters}) {

    return (
        <div className="flex flex-col w-screen bg-gray-50 m-h-full">
            <Head>
                <title>Health Explore</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <Searchbar />

            <div className="mx-auto px-4 container flex flex-col lg:flex-row">
                <div className="pr-10 sm:block hidden sm:flex flex-col">
                    {Object.entries(filters).map(([name, index]) => {
                        return <FilterBox key={index + Math.random() + Math.random()} name={name} index={index} values={filters[name]}/>
                    })}
                </div>
                <div className="block flex w-full h-2/3">
                    <DataBox />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export const getStaticProps = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/filters");
        const filters = await res.json();

        return {
            props: {
                filters,
            },
        };
    } catch(err) {
        return {
            props: {
                filters: {},
            },
        };
    }
};
