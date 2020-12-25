import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import setFullPlaylistInfo from '../../store/actionCreaters/setFullPlaylistInfo';
import store from '../../store/store';
import { Album, Artist, FullPlaylistInfo, Image, StateInterface, Track } from '../../types';
import FullPlaylistCard from './FullPlaylistCard';




interface PlaylistCardProps extends RouteComponentProps{
    images: Array<Image>,
    name: string,
    description: string
    tracks: Track
}

interface PropsFromState {
    fullPlaylistInfo: FullPlaylistInfo,
    accessToken: string
}

class PlaylistCard extends React.Component<PlaylistCardProps & PropsFromState> {
    state = {
        isCardOpen: false,
        tracks: []
    }

    token = this.props.accessToken

    getPlaylistsTracks(trackshref: string) {
        const result = fetch(`${trackshref}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + this.token}
        })
        .then((response) => response.json())
        .then((data) => {
            return data
        })

        return result
    }

    componentDidMount() {
        this.getPlaylistsTracks(this.props.tracks.href)
        .then((data) => this.setState({ tracks: data.items}))
    }

    handleClick () {
        this.props.history.push("/fullplaylistcard");
    }

    setFullPlaylistInfo () {
        const info = {
            images: this.props.images,
            name: this.props.name,
            description: this.props.description,
            tracks: this.props.tracks,
        }
        store.dispatch(setFullPlaylistInfo(info));
    }

    render() {
        return (
            <>
                    <Card style={{
                        width: '18rem',
                        marginBottom: "12px"
                    }} onClick={() => {
                        this.setFullPlaylistInfo()
                        this.handleClick()
                    }}>
                        <Card.Img variant="top" src={this.props.images[0].url} />
                        <Card.Body>
                            <Card.Title>{this.props.name}</Card.Title>
                            <Card.Text>{this.props.description}</Card.Text>
                        </Card.Body>
                    </Card>
            </>
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({
    fullPlaylistInfo: state.fullPlaylistInfo,
    accessToken: state.accessToken,
})

export default connect(mapStateToProps)(PlaylistCard)