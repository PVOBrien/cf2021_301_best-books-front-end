import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

class AddItem extends React.Component {
  render() {
    return (
      <>
        <Modal show={this.props.modalIsDisplayedToAI} onHide={this.props.closeModaldowntoAI}>
            <Modal.Header onClick={this.props.closeModaldowntoAI} closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted"> We'll never share your email with anyone else.</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
              </Form>
            </Modal.Body>

        </Modal>
      </>
    )
  }
}

export default AddItem;
