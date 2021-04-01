import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class UpdateForm extends React.Component {
  render() {
    console.log('uf.props', this.props);
    return (
      <Modal show={this.props.isShown} onHide={this.props.unShow}>
        <Form>
          <Form.Group>
            <Form.Label>Title Edit: </Form.Label>
            <Form.Control type="text" placeholder={this.props.bookToEdit.name} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description Edit: </Form.Label>
            <Form.Control as="textarea" rows={3} placeholder={this.props.bookToEdit.description} />
          </Form.Group>
        </Form>
        <Button>Close</Button>
      </Modal>
    )
  }
}
export default UpdateForm;