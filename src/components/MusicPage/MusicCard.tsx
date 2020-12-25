import { BrowserHistory } from 'history';
import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import setArtistId from '../../store/actionCreaters/setArtistId';
import store from '../../store/store';
import { Album, Artist, FullPlaylistInfo, Image, StateInterface } from '../../types';



interface MusicCardProps extends RouteComponentProps {
    images: Array<Image>,
    artists: Array<Artist>,
}

interface PropsFromState {
    fullPlaylistInfo: FullPlaylistInfo
}

class MusicCard extends React.Component<MusicCardProps & PropsFromState> {
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
                        store.dispatch(setArtistId(this.props.artists[0].id))
                        this.handleClick()
                    }}>
                        <Card.Img variant="top" src={this.props.images[0].url} />
                        <Card.Body>
                            <Card.Title>{this.props.artists.map(artist => artist.name + " ")}</Card.Title>
                        </Card.Body>
                    </Card>
            </>
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({
    fullPlaylistInfo: state.fullPlaylistInfo,
})

export default connect(mapStateToProps)(MusicCard)