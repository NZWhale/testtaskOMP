import { BrowserHistory } from 'history';
import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import setArtistId from '../../store/actionCreaters/setArtistId';
import store from '../../store/store';
import no_cover_thumb from '../../no_cover_thumb.gif'
import { Album, Artist, FullPlaylistInfo, Image, StateInterface } from '../../types';





interface ArtistCardProps {
    artist: Artist;
}

class ArtistCard extends React.Component<ArtistCardProps & RouteComponentProps> {
    handleClick = () => {
        this.props.history.push("/fullmusiccard");
    }
    render() {
        return (
            <>
                    <Card style={{
                        width: '18rem',
                        marginBottom: "12px"
                    }} onClick={() => {
                        store.dispatch(setArtistId(this.props.artist.id))
                        this.handleClick()
                    }}>
                        <Card.Img variant="top" src={this.props.artist.images.length?this.props.artist.images[0].url:no_cover_thumb} />
                        <Card.Body>
                            <Card.Title>{this.props.artist.name}</Card.Title>
                        </Card.Body>
                    </Card>
            </>
        )
    }
}


export default ArtistCard