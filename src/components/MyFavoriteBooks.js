import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/myFavoriteBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import AddItem from './addItem';
import UpdateForm from './UpdateForm.js';
import { Button } from 'react-bootstrap';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      email: '',
      bookName: '',
      updateFormIsShown: false,
      indexOfChosen: 0,
      chosenBook: {},
      userId: '',
      bookNameToUpdate: '',
      bookDescriptionToUpdate: ''
    }
  }

  componentDidMount = async () => {
    try {
      const SERVER = process.env.REACT_APP_SERVER_URL;
      const books = await axios.get(`${SERVER}/books`, { params: { user_name: this.props.auth0.user.email } })
      console.log('FaveBook.cdm', books);
      this.setState({ books: books.data.books, userId: books.data._id });
      console.log(books.data._id);
    } catch (error) {
      console.log(error);
    }
  }

  handleOnChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    console.log('targetName:', targetName);
    console.log('targetValue:', targetValue);
    this.setState({ [targetName]: targetValue})
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log('BUMP in hOS');
    const book = {
      description: this.state.bookDescriptionToUpdate,
      name: this.state.bookNameToUpdate,
      status: "TBD"
    }

    console.log('the index:', this.state.indexOfChosen);
    console.log('the newBook:', book);
    console.log('all the books', this.state.books);
    this.state.books.splice(this.state.indexOfChosen, 1, book);
    // console.log('newBooks:', newBooks);
    // this.setState({books: newBooks});
    this.setState({updateFormIsShown: false});
  }

  getid = (theId) => { this.setState({ userId: theId }) };

  displayUpdateForm = (theIndex) => {
    this.setState({ updateFormIsShown: true });
    const selectedBook = this.state.books[theIndex];
    this.setState({ chosenBook: selectedBook, indexOfChosen: theIndex })
  };
  closeUpdateForm = () => { this.setState({ updateFormIsShown: false }) };

  deleteItem = async (index) => {
    const SERVER = process.env.REACT_APP_SERVER_URL;
    const delItem = await axios.delete(`${SERVER}/item/${index}`, { params: { theUserId: this.state.userId } });
    console.log('within deleteItem:', delItem);
    this.setState({ books: delItem.data.books });
  };

  render() {
    return (
      <>
        <AddItem
          modalIsDisplayedToAI={this.props.modalIsDisplayedToMFB}
          closeModaldowntoAI={this.props.closeModal} />
        <Jumbotron>
          <Button variant="outline-primary" onClick={this.props.openModal}>Add a Book</Button>{' '}
          <div>
            <h1>My Favorite Books</h1>
            <p>This is a collection of my favorite books</p>
          </div>
          {this.state.books.map((book, index) => {
            return (
              <div key={index}>
                <Button onClick={() => { this.displayUpdateForm(index) }}>Edit Item</Button>
                <h3>{book.name}</h3>
                <p>{book.description}</p>
                <Button variant="danger" onClick={() => { this.deleteItem(index) }}>Delete</Button>
              </div>
            )
          })}
            <UpdateForm
              bookToEdit={this.state.chosenBook}
              isShown={this.state.updateFormIsShown}
              unShow={this.closeUpdateForm}
              bookNToUpdate={this.state.bookNameToUpdate}
              updateState={this.handleOnChange}
              descToUpdate={this.state.bookDescriptionToUpdate}
              executeUpdate={this.handleOnSubmit}
            />
        </Jumbotron>
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
