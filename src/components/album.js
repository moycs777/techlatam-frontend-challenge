import React, { Component } from 'react';


const api = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

class Album extends Component {

    constructor(props) {
        super(props);

        this.state = {
            entries:[],
            isLoading:false,
            error:false
        };
    }

    componentDidMount() {
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
                console.log("api data: " + JSON.stringify(data));
                this.setState({ isLoading:false, entries:data.feed.entry})
            })
            .catch(err=> this.setState({isLoading:false}));
    } 

    render() {
        const { entries, isLoading, error } = this.state;
        return (
            <div className="App">
                <p>Album Component</p>
            </div>
        );
    }
}

export default Album;
