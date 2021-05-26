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
      bookDesc: '',
      bookStat: ''
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
      console.log('Ah! An Error!',error);
    }
  }

  handleDropDownChange = (e) => {
    const newStatus = e;
    this.setState({ bookStat: newStatus});
  }

  handleOnChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    this.setState({ [targetName]: targetValue})
  }

  handleOnSubmitNew = async(e) => {
    const SERVER = process.env.REACT_APP_SERVER_URL;
    e.preventDefault();
    const thisBook = {
      description: this.state.bookDesc,
      name: this.state.bookName,
      status: this.state.bookStat
    }

    let idToSend = this.state.userId

    const updatedBooksArr = await axios.post(`${SERVER}/postRoute`, { params: {name: idToSend, newBook: thisBook}}); // does not require params:, can have just an object of key value params.


    this.setState({ books: updatedBooksArr.data});

  }

  handleOnSubmit = async(e) => {
    const SERVER = process.env.REACT_APP_SERVER_URL;
    e.preventDefault();
    console.log('BUMP in hOS');
    const thisBook = {
      description: this.state.bookDescriptionToUpdate,
      name: this.state.bookNameToUpdate,
      status: this.state.bookStat
    }

    let idToSend = this.state.userId;

    console.log('the index:', this.state.indexOfChosen);
    console.log('the newBook:', thisBook);
    console.log('all the books', this.state.books);
    this.state.books.splice(this.state.indexOfChosen, 1, thisBook); // this works IN PLACE. No need to hold the results in a variable. So... this sets state?

    const updatedBooksArr = await axios.put(`${SERVER}/item/${this.state.indexOfChosen}`, {bookToAdd: thisBook, idOfUser: idToSend});

    console.log(updatedBooksArr);
    this.setState({ books: updatedBooksArr.data});

    this.setState({updateFormIsShown: false});
  }

  getid = (theId) => { this.setState({ userId: theId }) };

  displayUpdateForm = (theIndex) => {
    this.setState({ updateFormIsShown: true });
    const selectedBook = this.state.books[theIndex];
    this.setState({ chosenBook: selectedBook, indexOfChosen: theIndex })
    console.log('the chosen', this.state.chosenBook);
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
          closeModaldowntoAI={this.props.closeModal}
          changeFromParent={this.handleOnChange}
          dDChangeFromPar={this.handleDropDownChange}
          newSubmit={this.handleOnSubmitNew}
          />
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
