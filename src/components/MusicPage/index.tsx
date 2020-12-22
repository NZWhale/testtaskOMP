import * as React from 'react';
import { Form } from 'react-bootstrap';
import MusicCard from './MusicCard';



class MusicPage extends React.Component {
    state = {
        price: "2.5"
    }
    render() {
        return (
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start"
            }}>
                <div style={{
                    marginTop: "12px"
                }}>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Book</Form.Label>
                            <Form.Control type="text" placeholder="Book title" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Ganre</Form.Label>
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicRange">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" placeholder={`${this.state.price} $`} disabled={true}/>
                            <Form.Control type="range" min="0" max="5" step="0.1" onChange={(e) => {this.setState({price: e.target.value})}}/>
                        </Form.Group>
                    </Form>
                </div>
                <div style={{
                    marginLeft: "25%",
                    marginTop: "12px"
                }}>
                    <MusicCard />
                    <MusicCard />
                    <MusicCard />
                    <MusicCard />
                    <MusicCard />
                    <MusicCard />
                    <MusicCard />
                    <MusicCard />
                </div>
            </div>
        )
    }
}

export default MusicPage