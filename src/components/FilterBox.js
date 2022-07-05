import React from "react";

import dispatcher from '../../dispatcher';

export default class FilterBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { active: true, midValue: '1', local_filters: {} };
        this.setFilter = this.setFilter.bind(this);
        this.makeTitle = this.makeTitle.bind(this);
    }

    componentDidMount() {
        let local_filters = JSON.parse(localStorage.getItem('local_filters') || "{}");
        this.setState({ local_filters: local_filters});
        this.forceUpdate();
    }

    setFilter = (filter_type, filter_value) => {
        let local_filters = JSON.parse(localStorage.getItem('local_filters') || "{}");
        if(local_filters.hasOwnProperty(filter_type) && local_filters[filter_type] == filter_value) {
            delete local_filters[filter_type];
        } else {
            local_filters[filter_type] = filter_value;
        }

        localStorage.setItem('local_filters', JSON.stringify(local_filters));
        this.setState({ local_filters: local_filters});

        dispatcher.dispatch({
            actionType: 'filterChanged',
            query: ''
        });
    }

    makeTitle = (slug) => {
        let words = slug.split('_');
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            words[i] = word.charAt(0).toUpperCase() + word.slice(1);
        }
        return words.join(' ');
    }

    render() {
        return (
            <div className='bg-white w-60 py-4 my-4 flex flex-col '>
                <h6 className='pb-2 px-4 font-medium'>{this.makeTitle(this.props.name)}</h6>
                <ul className=''>
                    {this.props.values.map((filter, index) => {
                        return (
                            <li key={index}
                                onClick={() => { this.setFilter(this.props.name, filter.key) }}
                                className={`cursor-pointer hover:text-blue-500 focus:text-blue-800 py-1 px-4 ${(this.state.local_filters.hasOwnProperty(this.props.name) && this.state.local_filters[this.props.name] == filter.key) ? 'text-blue-500' : ''}`}>
                                <p className='text-sm inline-block pr-4'>{filter.key}</p>
                                <span className={`text-xs text-gray-500`}>{filter.doc_count}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}
