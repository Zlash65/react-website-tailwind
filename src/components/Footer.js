import React from "react";

const Footer = () => (

    <footer className="bg-white mt-4 pb-4 pt-8">
        <div className="mx-auto px-4 container overflow-hidden flex flex-col lg:flex-row justify-between">

            <div className="w-3/6 block sm:flex text-sm mt-6 lg:mt-0">

                <div className='text-gray-700 p-0 flex flex-col text-left w-full'>
                    <p className='text-2xl'>
                        About us
                    </p>

                    <p className='py-1 text-gray-500 text-sm'>
                        We are a team of nurses, doctors, technologists and executives dedicated to help nurses find jobs that they love.
                    </p>
                    <p className='py-1 text-gray-500 text-sm'>
                        All copyrights reserved &#169; 2020 - Health Explore
                    </p>
                </div>

            </div>

            <div className="w-1/6 block sm:flex text-sm mt-6 lg:mt-0">

                <div className="text-gray-700 p-0 flex flex-col text-left w-full">
                    <p className='text-2xl'>
                        Sitemap
                    </p>
                    <ul>
                        <li><a href="#" className="inline-block py-1 text-gray-500 hover:text-blue-500 no-underline">Nurses</a></li>
                        <li><a href="#" className="inline-block py-1 text-gray-500 hover:text-blue-500 no-underline">Employees</a></li>
                        <li><a href="#" className="inline-block py-1 text-gray-500 hover:text-blue-500 no-underline">Social Networking</a></li>
                        <li><a href="#" className="inline-block py-1 text-gray-500 hover:text-blue-500 no-underline">Jobs</a></li>
                    </ul>
                </div>

            </div>

            <div className="w-1/6 block sm:flex text-sm mt-6 lg:mt-0">

                <div className="text-gray-700 p-0 flex flex-col text-left w-full">
                    <p className='text-2xl'>
                        Privacy
                    </p>
                    <ul>
                        <li><a href="#" className="inline-block py-1 text-gray-500 hover:text-blue-500 no-underline">Terms of use</a></li>
                        <li><a href="#" className="inline-block py-1 text-gray-500 hover:text-blue-500 no-underline">Privacy Policy</a></li>
                        <li><a href="#" className="inline-block py-1 text-gray-500 hover:text-blue-500 no-underline">Cookie Policy</a></li>
                    </ul>
                </div>

            </div>
        </div>

    </footer>

)

export default Footer;
