import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/myFavoriteBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import AddItem from './addItem';
import { Button } from 'react-bootstrap';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      email: '',
      userId: ''
    }
  }

  componentDidMount = async () => {
    try {
      const SERVER = process.env.REACT_APP_SERVER_URL;
      const books = await axios.get(`${SERVER}/books`, { params: { user_name: this.props.auth0.user.email } })
      console.log('FaveBook.cdm', books);
      this.setState({ books: books.data.books, userId: books.data._id});
      console.log(books.data._id);
    } catch (error) {
      console.log(error);
    }
  }

  getid = (theId) => { this.setState({ userId: theId }) };


  deleteItem = async (index) => {
    const SERVER = process.env.REACT_APP_SERVER_URL;

    const delItem = await axios.delete(`${SERVER}/item/${index}`, { params: { theUserId: this.state.userId } });
    console.log(delItem);
    this.setState({ books: delItem.data.books});

    // const newItemsArray = this.state..filter((item, i) => {
      // return index !== i; // why are we getting rid of just the one selected right now?
    };
  

  render() {
    return (
      <>
        <AddItem
          modalIsDisplayedToAI={this.props.modalIsDisplayedToMFB}
          closeModaldowntoAI={this.props.closeModal} />
        <Jumbotron>
          <Button variant="outline-primary" onClick={this.props.openModal}>Add a Book</Button>{' '}
          <h1>My Favorite Books</h1>
          <p>This is a collection of my favorite books</p>

          {this.state.books.map((book, index) => {
            return (
                <div key={index}>
                  <h3>{book.name}</h3>
                  <p>{book.description}</p>
                  <Button onClick={() => { this.deleteItem(index) }}>Delete</Button>
                </div>
            )
          })}

          {/* // this below will be in the map, hence the i */}
        </Jumbotron>
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
