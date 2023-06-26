import { useContext, useState } from 'react';
import { EnqueteType } from '@/types/Enquete';
import { editEnquete, deleteEnquete } from '@/services/Enquete';
import { EnqueteContext } from '@/context/EnqueteContext';

type props = {
  enquete: EnqueteType;
};

const EditableText: React.FC<props> = ({ enquete }: props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(enquete.pergunta);
  const { setRealoadEnquete } = useContext(EnqueteContext);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    const response = await editEnquete({ pergunta: text, id: enquete.id });
    if (response === 'SUCCESS') {
      setRealoadEnquete(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleDelete = async () => {
    const response = await deleteEnquete(enquete.id);
    if (response === 'SUCCESS') {
      setRealoadEnquete(true);
    }
  };

  return (
    <div>
      {isEditing ? (
        <input
          type='text'
          value={text}
          onChange={handleChange}
          data-testid={`input-enquete-${enquete.id}`}
        />
      ) : (
        <p data-testid={`text-enquete-${enquete.id}`}>{text}</p>
      )}
      <button onClick={handleEdit} data-testid={`edit-enquete-${enquete.id}`}>
        Edit
      </button>
      <button
        disabled={!isEditing}
        data-testid={`save-enquete-${enquete.id}`}
        onClick={handleSave}
      >
        Save
      </button>
      <button
        onClick={handleDelete}
        data-testid={`delete-enquete-${enquete.id}`}
      >
        delete
      </button>
    </div>
  );
};

export default EditableText;
