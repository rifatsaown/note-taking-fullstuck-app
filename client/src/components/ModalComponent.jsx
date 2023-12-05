import { Button, Label, Modal, TextInput, Textarea } from "keep-react";
import { CloudArrowUp } from "phosphor-react";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const ModalComponent = ({refetch}) => {
  const [showModal, setShowModal] = useState(false);


  const handleAddNote = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
    fetch("http://localhost:3000/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: e.target.noteName.value,
        content: e.target.noteContent.value,
      }),
    });

    setTimeout(() => {
      refetch();
    }, 100);
    // reset form
    e.target.noteName.value = "";
    e.target.noteContent.value = "";
  };

  return (
    <>
      <Button type="primary" onClick={() => setShowModal(!showModal)}>
        Create Note
      </Button>
      <Modal
        icon={<CloudArrowUp size={30} color="#1B4DFF" />}
        size="5xl"
        show={showModal}
        position="center"
      >
        <Modal.Header>Create New Note</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddNote}>
            <Label value="Name of Note" />
            <TextInput id="#id-8" name="noteName" required placeholder="Name" color="gray" />
            <Label value="Note Content" />
            <Textarea
              id="comment"
              name="noteContent"
              required={true}
              placeholder="Write Your Note..."
              withBg={true}
              color="gray"
              border={true}
              rows={4}
            />
            <div>
              <Button
                type="outlineGray"
                onClick={() => setShowModal(!showModal)}
              >
                Cancel
              </Button>
              <input type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-lg text-white px-4 py-2" value="Add Note" />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
