import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { token } from '.';
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
    fullPlaylistInfo: FullPlaylistInfo
}

class PlaylistCard extends React.Component<PlaylistCardProps> {
    state = {
        isCardOpen: false,
        tracks: []
    }

    getPlaylistsTracks(trackshref: string) {
        const result = fetch(`${trackshref}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
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
                        {/* {this.state.isCardOpen && 
                            <FullPlaylistCard images={this.props.images} name={this.props.name} description={this.props.description} tracks={this.state.tracks}/>
                        } */}
                    </Card>
            </>
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({
    fullPlaylistInfo: state.fullPlaylistInfo,
})

export default connect(mapStateToProps)(PlaylistCard)