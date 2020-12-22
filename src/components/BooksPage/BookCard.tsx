import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Book } from '../../types';
import no_cover_thumb from '../../no_cover_thumb.gif'

interface BookCardProps {
    book: Book
}

class BookCard extends React.Component<BookCardProps> {
    state = {
        clicked: false
    }
    render() {
        return (
            <>
                <Card style={{
                    width: '18rem',
                    marginBottom: "12px"
                }}>
                    <Card.Img variant="top" src={this.props.book.volumeInfo.imageLinks?this.props.book.volumeInfo.imageLinks.thumbnail:no_cover_thumb} onClick={() => this.setState({ clicked: !this.state.clicked })} style={{cursor: "pointer"}} />
                    {this.state.clicked &&
                        <Card.Body>
                            <Card.Title>{this.props.book.volumeInfo.title}</Card.Title>
                            <Card.Text>
                                {this.props.book.volumeInfo.description}
                            </Card.Text>
                            <Button variant="primary" href={this.props.book.volumeInfo.infoLink}>Buy</Button> {this.props.book.saleInfo.listPrice ? this.props.book.saleInfo.listPrice.amount + " " + this.props.book.saleInfo.listPrice.currencyCode : "NOT FOR SALE"}
                        </Card.Body>
                    }
                </Card>
            </>
        )
    }
}

export default BookCard