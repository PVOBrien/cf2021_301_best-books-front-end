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

  // handleOnChange = (e) => {
  //   const target = e.target;
  //   const name = e.target.name;
  //   const value = target.value;
  //   console.log('name: ', name + ' and value:', value);
  // }

  render() {
    return (
      <>
        <Modal show={this.props.modalIsDisplayedToAI}
        onHide={this.props.closeModaldowntoAI}>
          <Modal.Header onClick={this.props.closeModaldowntoAI} closeButton>
            <Modal.Title>Add a New Book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.props.newSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                  name="bookName"
                  type="text"
                  placeholder="Enter name of book"
                  onChange={(e) => this.props.changeFromParent(e)}
                />
                {/* <Form.Text className="text-muted"> We'll never share your email with anyone else.</Form.Text> */}
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Book Description</Form.Label>
                <Form.Control
                  name="bookDesc"
                  type="text"
                  placeholder='Enter description of book'
                  onChange={(e) => this.props.changeFromParent(e)}
                />
              </Form.Group>

              <Dropdown
                name="Dropdown"
                onSelect={this.props.dDChangeFromPar}
              >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Status
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    name="dropdown"
                    eventKey="Have Read"
                  >Have Read</Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Want to Read">
                      Want to Read
                  </Dropdown.Item>
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
