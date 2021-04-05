import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class UpdateForm extends React.Component {
  render() {
    // console.log('uf.props', this.props);
    return (
      <Modal show={this.props.isShown} onHide={this.props.unShow}>
        <Form onSubmit={(e) => {this.props.executeUpdate(e)}}>
          <Form.Group>
            <Form.Label>Title Edit: </Form.Label>
            <Form.Control
              type="text"
              placeholder={this.props.bookToEdit.name}
              name="bookNameToUpdate"
              value={this.props.bookNToUpdate}
              onChange={this.props.updateState}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description Edit: </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bookDescriptionToUpdate"
              placeholder={this.props.bookToEdit.description}
              value={this.props.descToUpdate}
              onChange={this.props.updateState}
              />
          </Form.Group>
        <Button variant="primary" type="submit">Update</Button>
        </Form>
        <Button variant="outline-warning" onClick={this.props.unShow}>Close</Button>
      </Modal>
    )
  }
}
export default UpdateForm;