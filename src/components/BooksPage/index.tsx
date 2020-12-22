import * as React from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import setBooks from '../../store/actionCreaters/setBooks';
import store from '../../store/store';
import { Book, StateInterface } from '../../types';
import getRandomInRange from '../../utils';
import BookCard from './BookCard';

interface PropsFromState {
    books: Array<Book>
}

class BooksPage extends React.Component<PropsFromState> {
    state = {
        price: "2.5",
        author: "",
        bookTitle: ""
    }

    getBooks() {
        const data = fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms&key=AIzaSyAh89PfCOjLrq5Mz1F5q40-CP7pWPKtz0k")
            .then((response) => response.json())
            .then((data) => {
                return data
            })
        return data
    }

    getBooksByKeywords(keywords: string) {
        const data = fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${keywords}&key=AIzaSyAh89PfCOjLrq5Mz1F5q40-CP7pWPKtz0k`)
            .then((response) => response.json())
            .then((data) => {
                return data
            })
        return data
    }
    getBooksByAuthor(keywords: string) {
        const data = fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${keywords}&key=AIzaSyAh89PfCOjLrq5Mz1F5q40-CP7pWPKtz0k`)
            .then((response) => response.json())
            .then((data) => {
                return data
            })
        return data
    }

    componentDidMount() {
        this.getBooks()
            .then(data => {
                const books: Array<Book> = data.items
                books.map(book => {
                    book.price = getRandomInRange(0, 5)
                })
                store.dispatch(setBooks(books))
                console.log(store.getState().books)
            })
    }

    render() {
        const booksList = this.props.books.map((book: Book, index: any) =>
            <BookCard book={book} key={index.toString()} />
        )
        return (
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start"
            }}>
                <div style={{
                    marginTop: "12px",
                    marginLeft: "12px"
                }}>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Search by title</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Enter book title"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => this.setState({bookTitle: e.target.value})}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-secondary" onClick={() => {
                                this.getBooksByKeywords(this.state.bookTitle)
                                    .then((data) => {
                                        const books: Array<Book> = data.items
                                        store.dispatch(setBooks(books))
                                    })
                            }}>Search</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Search by author</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Enter author name"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => this.setState({author: e.target.value})}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-secondary" onClick={() => {
                                this.getBooksByAuthor(this.state.author)
                                    .then((data) => {
                                        const books: Array<Book> = data.items
                                        store.dispatch(setBooks(books))
                                    })
                            }}>Search</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formBasicRange">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" placeholder={`${this.state.price} $`} disabled={true} />
                            <Form.Control type="range" min="0" max="5" step="0.1" onChange={(e) => { this.setState({ price: e.target.value }) }} />
                        </Form.Group>
                    </Form>
                </div>
                <div style={{
                    marginLeft: "22.5%",
                    marginTop: "12px"
                }}>
                    {booksList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({
    books: state.books,
})

export default connect(mapStateToProps)(BooksPage)