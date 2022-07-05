import React from "react";
import axios from 'axios';

import dispatcher from '../../dispatcher';

export default class DataBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            hospital: '0',
            job: '0',
            hospitalActive: false,
            jobActive: false,
            jobs: [],
            total_jobs: 0,
            location: null,
            role: null,
            department: null,
            education: null,
            experience: null
        };

        this.callApi = this.callApi.bind(this);
        this.hospital = this.hospital.bind(this);
        this.job = this.job.bind(this);
        this.sort = this.sort.bind(this);
    }

    componentDidMount() {
        let self = this;
        this.callApi(self);
        dispatcher.register(function(payload){
            if(payload.actionType === 'filterChanged') {
                self.callApi(self);
            }
        });
    }

    callApi = (self) => {
        self.setState({ loading: true })
        let local_filters = JSON.parse(localStorage.getItem('local_filters') || "{}");

        if(!local_filters.hasOwnProperty('sort')) {
            local_filters['sort'] = {
                location: null,
                role: null,
                department: null,
                education: null,
                experience: null
            }
        }

        axios.get('/api/jobs', {params: {filters: local_filters}})
            .then((result) => {
                console.log(result.data.query);
                self.setState({
                    loading: false,
                    jobs: result.data.jobs,
                    total_jobs: result.data.total_jobs,
                    location: local_filters['sort']['location'],
                    role: local_filters['sort']['role'],
                    department: local_filters['sort']['department'],
                    education: local_filters['sort']['education'],
                    experience: local_filters['sort']['experience']
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    hospital = (id) => {
        const prev_active = this.state.hospital;
        this.setState({
            hospital: id,
            jobActive: false,
            hospitalActive: (prev_active == id) ? !this.state.hospitalActive : true
        });
    }

    job = (id) => {
        const prev_active = this.state.job;
        this.setState({
            job: id,
            jobActive: (prev_active == id) ? !this.state.jobActive : true
        });
    }

    sort = (state) => {
        let dynamic = {};
        dynamic[state] = this.state[state]

        let local_filters = JSON.parse(localStorage.getItem('local_filters') || "{}");

        if (dynamic[state] == null) {
            dynamic[state] = 'asc';
            this.setState(dynamic);
        } else if (dynamic[state] == 'asc') {
            dynamic[state] = 'desc';
            this.setState(dynamic);
        } else {
            dynamic[state] = null;
            this.setState(dynamic);
        }

        if(!local_filters.hasOwnProperty('sort')) {
            local_filters['sort'] = {
                location: null,
                role: null,
                department: null,
                education: null,
                experience: null
            }
        }

        local_filters['sort'][state] = dynamic[state];
        localStorage.setItem('local_filters', JSON.stringify(local_filters));
        this.forceUpdate();

    }

    render() {
        return (
            <div className={`bg-white w-full py-4 my-4 ${this.state.loading ? 'animate-pulse delay-75 duration-75 cursor-not-allowed' : ''}`}>
                <div className="flex justify-between pb-2">
                    <div className='pb-2 px-4'>
                        <p className="font-medium">{this.state.total_jobs} <small className="font-light">job postings</small></p>
                    </div>

                    <div className="pr-4">
                        <ul className={`sm:flex hidden space-x-6`}>
                            <li className={`text-gray-500`}>Sort by</li>
                            <li className={`${this.state.loading ? 'cursor-not-allowed' : 'cursor-pointer sm:hover:text-blue-300 transition hover:bg-gray-800 duration-200 sm:hover:bg-transparent flex'}`}>
                                <a href="#" onClick={() => this.sort('location')}>
                                    Location
                                    {this.state.location ? '('+this.state.location+')' : ''}
                                </a>
                            </li>
                            <li className={`${this.state.loading ? 'cursor-not-allowed' : 'cursor-pointer sm:hover:text-blue-300 transition hover:bg-gray-800 duration-200 sm:hover:bg-transparent'}`}>
                                <a href="#" onClick={() => this.sort('role')}>Role
                                    {this.state.role ? '('+this.state.role+')' : ''}
                                </a>
                            </li>
                            <li className={`${this.state.loading ? 'cursor-not-allowed' : 'cursor-pointer sm:hover:text-blue-300 transition hover:bg-gray-800 duration-200 sm:hover:bg-transparent'}`}>
                                <a href="#" onClick={() => this.sort('department')}>Department
                                    {this.state.department ? '('+this.state.department+')' : ''}
                                </a>
                            </li>
                            <li className={`${this.state.loading ? 'cursor-not-allowed' : 'cursor-pointer sm:hover:text-blue-300 transition hover:bg-gray-800 duration-200 sm:hover:bg-transparent'}`}>
                                <a href="#" onClick={() => this.sort('education')}>Education
                                    {this.state.education ? '('+this.state.education+')' : ''}
                                </a>
                            </li>
                            <li className={`${this.state.loading ? 'cursor-not-allowed' : 'cursor-pointer sm:hover:text-blue-300 transition hover:bg-gray-800 duration-200 sm:hover:bg-transparent'}`}>
                                <a href="#" onClick={() => this.sort('experience')}>Experience
                                    {this.state.experience ? '('+this.state.experience+')' : ''}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />

                <div className="">
                    <ul className="divide-y divide-gray-200">
                        {this.state.jobs.map((job, index) => {
                            return (
                                <li key={index + Math.random() + Math.random()} className={`${this.state.loading ? 'cursor-default' : 'cursor-pointer hover:text-blue-500 focus:text-blue-800'} px-4 pt-2 pb-2 flex flex-col`}>
                                    <div className={`${this.state.loading ? '' : 'hover:bg-gray-300'}`} onClick={() => this.hospital(index)}>
                                        <a className="text-sm inline-block p-2 w-10 text-center text-white transition bg-gray-500 rounded shadow ripple focus:outline-none">
                                            {job.initials}
                                        </a>
                                        <p className='text-sm inline-block pl-4 tracking-wide text-gray-600'>{job.total_jobs_in_hospital} jobs in {job.name}</p>
                                    </div>

                                    <ul className={`divide-y divide-gray-200 bg-gray-100 mt-1 ${(this.state.hospital == index && this.state.hospitalActive) ? 'block' : 'hidden'}`}>
                                        {job.items.map((item, item_index) => {
                                            return (
                                                <li key={item_index + Math.random() + Math.random()} className={`${this.state.loading ? 'cursor-default' : 'cursor-pointer'} pt-2 pb-2 ${((this.state.job == item_index && this.state.jobActive) || this.state.loading ) ? '' : 'hover:bg-blue-100'}`} onClick={() => this.job(item_index)}>
                                                    <p className='text-sm inline-block pr-4 pl-4 tracking-wide text-gray-600 font-bold'>{job.job_title}</p>
                                                    <p className="text-gray-400 pr-4 pl-4 text-sm">{item.job_type} | ${item.salary_range[0]} - ${item.salary_range[1]} an hour | {item.city}</p>

                                                    <div className={`cursor-default pr-4 pl-4 mt-2 flex flex-col ${(this.state.job == item_index && this.state.jobActive) ? 'block' : 'hidden'}`}>
                                                        <div className="grid grid-cols-5 gap-3 mt-2 container overflow-hidden flex flex-col lg:flex-row">
                                                            <p className="col-span-2 text-sm text-gray-600 font-bold">Department:</p>
                                                            <p className="col-span-2 text-sm text-gray-700">
                                                                {item.department.map((dept, dept_index) => {
                                                                    return <span>{dept}{(dept_index + 1 == item.department.length) ? '' : ', '} </span>
                                                                })}
                                                            </p>
                                                        </div>
                                                        <div className="grid grid-cols-5 gap-3 mt-2 container overflow-hidden flex flex-col lg:flex-row">
                                                            <p className="col-span-2 text-sm text-gray-600 font-bold">Hours / shifts:</p>
                                                            <p className="col-span-2 text-sm text-gray-700">{item.hours[0]} hours / {item.work_schedule}</p>
                                                        </div>
                                                        <div className="grid grid-cols-5 gap-3 mt-2 container overflow-hidden flex flex-col lg:flex-row">
                                                            <p className="col-span-2 text-sm text-gray-600 font-bold">Summary:</p>
                                                            <p className="col-span-2 text-sm text-gray-700">{item.description}</p>

                                                            <div className="col-span-1 sm:flex sm:flex-col hidden">
                                                                <button className="bg-blue-500 p-2 m-2 text-white rounded-lg w-max">Job details</button>
                                                                <button className="text-blue-500 p-2 m-2 border-blue-500 border-2 w-max rounded-lg">Save job</button>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-5 gap-3 mt-1 container overflow-hidden flex flex-col lg:flex-row sm:hidden block">
                                                            <p className="col-span-2">
                                                                <button className="bg-blue-500 p-2 m-2 text-white rounded-lg w-max">Job details</button>
                                                            </p>
                                                            <p className="col-span-2">
                                                                <button className="text-blue-500 p-2 m-2 border-blue-500 border-2 w-max rounded-lg">Save job</button>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                            )
                        })}

                    </ul>
                </div>
            </div>
        );
    }
}
