// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jobs from '../../../data/jobs.json';

export default async (req, res) => {
    res.statusCode = 200;
    // @todo: implement filters and search
    // @todo: implement automated tests

    let total_jobs = 0;
    let outer_data = [];
    let param = req.query.filters;
    let filters = JSON.parse(param)
    let query = !filters.query ? '' : filters.query.toLowerCase();

    jobs.forEach((value) => {
        let inner_data = [];
        let name = value.name.toString();
        let job_title = value.job_title.toString();

        value.items.forEach((item) => {
            if(!filters.job_type && !filters.work_schedule && !filters.experience && !filters.department && !query) {
                inner_data.push(item); return;
            }

            let city = item.city.toString();
            let jtype = item.type.toString();
            let state = item.state.toString();
            let county = item.county.toString();
            let address = item.address.toString();
            let job_type = item.job_type.toString();
            let experience = item.experience.toString();

            if((filters.job_type && filters.job_type == item.job_type)
                || (filters.experience && filters.experience == item.experience)
                || (filters.work_schedule && filters.work_schedule == item.work_schedule)
                || (filters.department && item.department.includes(filters.department))
                || (query && name.toLowerCase().includes(query))
                || (query && job_title.toLowerCase().includes(query))
                || (query && city.toLowerCase().includes(query))
                || (query && jtype.toLowerCase().includes(query))
                || (query && state.toLowerCase().includes(query))
                || (query && county.toLowerCase().includes(query))
                || (query && address.toLowerCase().includes(query))
                || (query && job_type.toLowerCase().includes(query))
                || (query && experience.toLowerCase().includes(query))) {
                inner_data.push(item);
            } else {
                return;
            }
        })

        if(!inner_data.length) return;
        total_jobs += inner_data.length;
        let initials = value.name.split(" ").map((n,i,a)=> i === 0 || i+1 === a.length ? n[0] : null).join("");
        value.initials = initials;
        outer_data.push(value);
    });

    // this timeout emulates unstable network connection, do not remove this one
    // you need to figure out how to guarantee that client side will render
    // correct results even if server-side can't finish replies in the right order
    await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));

    res.json({
        jobs: outer_data,
        total_jobs: total_jobs,
    })
}
