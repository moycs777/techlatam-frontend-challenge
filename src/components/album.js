import React, { Component } from 'react';

// url form itunes api
const api = 'https://itunes.apple.com/us/rss/topalbums/limit=10/json';

class Album extends Component {

    constructor(props) {
        super(props);

        // variables needed for the app
        this.state = {
            entries:[],
            isLoading:false,
            error:false
        };
    }

    componentDidMount() {
        // using loading text
        this.setState({ isLoading:true });
        fetch(api)
            .then( res => {
                if (res.ok) {
                    return res.json();
                }else{
                    throw new Error("something went wrong");
                }
            })
            .then( (data) => {
                // the calling is done so we cancel the loading text
                console.log("api data: " + JSON.stringify(data.feed.entry[1]['im:image'][0].label ));
                this.setState({ isLoading:false, entries:data.feed.entry})
            })
            .catch(err=> this.setState({isLoading:false}));
    } 
    render() {
        const { entries, isLoading, error } = this.state;
        if (error) {
            return <p>{error.message}</p>;    
        }
        if (isLoading) {
            return <p>Loading ...</p>;
        }
        return (
            <div className="" >
            {/* <div className="d-flex flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center" > */}
                <h1>albums</h1>
                <ul>
                    {entries.map(album =>
                        <li key={album.title.label}>
                            <a href={album.link.attributes.href} target="_blank">{album.title.label},</a>
                            <p>Category: {album.category.attributes.label}</p>
                            <p>asd: {album.image}</p>
                            {/* <img src="https://is2-ssl.mzstatic.com/image/thumb/Music128/v4/c1/7b/a9/c17ba975-34aa-ee68-d3c9-e1db840fa06b/075679886613.jpg/55x55bb-85.png"></img> */}
                            <img src={album['im:image'][0].label}></img>
                        </li>
                    )}
                </ul>
            </div>
        );
    }

    
}

export default Album;
