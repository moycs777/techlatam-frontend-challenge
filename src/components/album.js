import React, { Component } from 'react';
import AlbumDetail from './albumdetail';
// url form itunes api
const api = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

class Album extends Component {

    constructor(props) {
        super(props);

        // variables needed for the app
        this.state = {
            entries:[],
            isLoading:false,
            error:false,
            currentPage: 1,
            todosPerPage: 3
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
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
        
        //without pagination
        const { entries, isLoading, error } = this.state;
        var styles = {
            width: '18rem',
            
        };
        if (error) {
            return <p>{error.message}</p>;    
        }
        if (isLoading) {
            return <p>Loading ...</p>;
        }
        return (
            <div className="container">
				
				<div className="row">

					<h3>albums</h3>

				</div>

            	<div className="row">
                    <AlbumDetail
                        key={1}
                        styles={styles}
                        entries={entries}
                        propiedad={"una propiuedad q llega desde el componente padre"}
                    />                    

				</div>

			</div>
        );
    }

    
}

export default Album;
