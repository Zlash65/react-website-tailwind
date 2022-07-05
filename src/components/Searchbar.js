import React from "react";

import dispatcher from '../../dispatcher';

export default class Searchbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { query: '' };
        this.save = this.save.bind(this);
        this.search = this.search.bind(this);
        this.query = this.query.bind(this);
        this.store_value = this.store_value.bind(this);
    }

    componentDidMount() {
        this.store_value('');
    }

    store_value = (value) => {
        let local_filters = JSON.parse(localStorage.getItem('local_filters') || "{}");
        local_filters['query'] = value;
        localStorage.setItem('local_filters', JSON.stringify(local_filters));
    }

    save = (query) => {
        this.setState({ query: query })
        if(!query) {
            this.store_value('');
            dispatcher.dispatch({
                actionType: 'filterChanged',
                query: ''
            });
        }
    }

    search = () => {
        this.query(this.state.query);
    }

    query = (value) => {
        this.store_value(value);
        dispatcher.dispatch({
            actionType: 'filterChanged',
            query: value
        });
    }

    render() {
        return (
            <div className="container mx-auto flex flex-col items-center justify-center mt-4 bg-white text-gray-900 antialiased">
                <div className="px-4 py-2 border border-gray-200 border-opacity-75 rounded-lg w-full space-x-6 flex items-center">
                    <button className="focus:outline-none">
                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z"/></svg>
                    </button>
                    <input onChange={event => this.save(event.target.value)} onKeyPress={event => {if(event.key === 'Enter') {this.search()}}} type="search" className="w-full bg-transparent text-base focus:outline-none" placeholder="Search for any jobs, title, keywords or company" value={this.state.value}/>
                </div>
            </div>
        );
    }
}
