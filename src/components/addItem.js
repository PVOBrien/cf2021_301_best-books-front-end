import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { withAuth0 } from '@auth0/auth0-react';
import Dropdown from 'react-bootstrap/Dropdown'

class AddItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: this.props.auth0.user.email,
      bookName: ''
    }
  }

  handleOnChange = (e) => {
    const target = e.target;
    const name = e.target.name;
    const value = target.value;
  }

  render() {
    return (
      <>
        <Modal show={this.props.modalIsDisplayedToAI}
        onHide={this.props.closeModaldowntoAI}>
          <Modal.Header onClick={this.props.closeModaldowntoAI} closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                  name="bookName"
                  type="text"
                  placeholder="book name"

                />
                {/* <Form.Text className="text-muted"> We'll never share your email with anyone else.</Form.Text> */}
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Status
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Have Read</Dropdown.Item>
                  <Dropdown.Item>Want to Read</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group> */}
              <br></br>
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          </Modal.Body>

        </Modal>
      </>
    )
  }
}

export default withAuth0(AddItem);
