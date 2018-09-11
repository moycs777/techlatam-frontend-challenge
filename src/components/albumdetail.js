import React, { Component } from 'react';

class AlbumDetail extends Component {

    render() {

        return (
            <div className="row">

                {this.props.entries.map((album, i) =>

                    <div className="col-md-4">

                        <div className="card" style={this.props.styles} key={album.title.label + i + "key"}>

                            <img className="card-img-top" src={album['im:image'][0].label} alt={album['im:image'][0].label} />

                            <div className="card-body">

                                <h5 className="card-title">Artist: {album['im:artist'].label}.</h5>

                                <p className="card-text">Genre: {album.category.attributes.label}.</p>

                                <a href={album.link.attributes.href}
                                    className="btn btn-primary col-xs-1"
                                    target="_blank">
                                    {(album.title.label).substring(0, 25)}.
                                    </a>

                            </div>

                        </div>

                    </div>
                )}


            </div>
        );
    }


}


export default AlbumDetail;
