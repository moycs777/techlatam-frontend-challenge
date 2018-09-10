import React, { Component } from 'react';

// url form itunes api
const api = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

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
                console.log("api data: " + JSON.stringify(data.feed.entry[1]));
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
            <div>
                <h1>albums</h1>
                <ul>
                    {entries.map(album =>
                        <li key={album.title.label}>
                            <a href={album.link}>{album.title.label}</a>
                        </li>
                    )}
                </ul>
            </div>
        );
    }

    
}

export default Album;
