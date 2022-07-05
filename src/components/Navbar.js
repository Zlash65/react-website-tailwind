import React from "react";

export default class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {active: true, midValue: '1'};
        this.navMenu = this.navMenu.bind(this);
        this.navItem = this.navItem.bind(this);
    }

    navMenu = () => {
        this.setState({ active: !this.state.active });
    }

    navItem = (value) => {
        this.setState({ midValue: value });
    }

    render() {
        return (
            <nav className="bg-white w-screen sm:px-4 px-2 sm:flex justify-between items-center">
                <div className="flex px-4 py-4 sm:py-0 pb-1 justify-between">

                    <button
                        className='pr-4 text-blue-300 text-3xl sm:hidden block focus:outline-none'
                        id='navIcon' onClick={this.navMenu}>&#9776;
                    </button>

                    <h3 className="text-2xl text-blue-500"> Health Explore </h3>

                    <button className="sm:hidden block inline-block p-3 text-center text-white transition bg-blue-500 rounded-full focus:outline-none">Z</button>

                </div>

                <ul className={`sm:flex cursor-pointer ${this.state.active ? 'hidden' : 'block'}`} id='navContent'>
                    <li className={`py-4 px-6 sm:border-b-2 border-transparent sm:hover:text-blue-300 transition duration-200 text-blue-300 hover:bg-gray-800 sm:hover:bg-transparent ${(this.state.midValue == '1') ? 'border-blue-300' : ''}`} data-value='1' onClick={() => this.navItem('1')}><a href="#">Profile</a></li>
                    <li className={`py-4 px-6 sm:border-b-2 border-transparent sm:hover:text-blue-300 transition hover:bg-gray-800 duration-200 sm:hover:bg-transparent ${(this.state.midValue == '2') ? 'border-blue-300' : ''}`} data-value='2' onClick={() => this.navItem('2')}><a href="#">Job</a></li>
                    <li className={`py-4 px-6 sm:border-b-2 border-transparent sm:hover:text-blue-300 transition hover:bg-gray-800 duration-200 sm:hover:bg-transparent ${(this.state.midValue == '3') ? 'border-blue-300' : ''}`} data-value='3' onClick={() => this.navItem('3')}><a href="#">Professional Network</a></li>
                    <li className={`py-4 px-6 sm:border-b-2 border-transparent sm:hover:text-blue-300 transition hover:bg-gray-800 duration-200 sm:hover:bg-transparent ${(this.state.midValue == '4') ? 'border-blue-300' : ''}`} data-value='4' onClick={() => this.navItem('4')}><a href="#">Lounge</a></li>
                    <li className={`py-4 px-6 sm:border-b-2 border-transparent sm:hover:text-blue-300 transition hover:bg-gray-800 duration-200 sm:hover:bg-transparent ${(this.state.midValue == '5') ? 'border-blue-300' : ''}`} data-value='5' onClick={() => this.navItem('5')}><a href="#">Salary</a></li>
                </ul>

                <ul className={`align-middle sm:flex hidden justify-between cursor-pointer`} id='navContent'>
                    <li className='py-4 px-3 hover:text-blue-300 transition duration-200 hover:bg-gray-800 sm:hover:bg-transparent'>
                        <button className="inline-block px-6 py-3 text-xs font-medium leading-6 text-center text-blue-500 uppercase transition bg-transparent border-2 border-blue-700 rounded ripple hover:bg-blue-100 focus:outline-none">
                            Create Job
                        </button>
                    </li>
                    <li className='py-4 px-2 sm:hover:text-blue-300 transition hover:bg-gray-800 duration-200 sm:hover:bg-transparent'>
                        <button className="inline-block p-3 text-center text-white transition bg-blue-500 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">
                            Var
                        </button>
                    </li>
                    <li className='py-7 px-2'>
                        <button className="inline-block font-medium leading-6 text-center text-blue-500 uppercase transition bg-transparent rounded ripple focus:outline-none">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }
}
