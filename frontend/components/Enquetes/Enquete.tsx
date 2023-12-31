import { useState } from 'react';
import { EnqueteType } from '@/types/Enquete';
import { editEnquete, deleteEnquete } from '@/services/Enquete';
import { useEnquete } from '@/context/EnqueteContext';
import { useRouter } from 'next/router';
import { FaPenSquare, FaSave, FaTrash } from 'react-icons/fa';

type props = {
  enquete: EnqueteType;
};

const EditableText: React.FC<props> = ({ enquete }: props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(enquete.pergunta);
  const { setRealoadEnquete } = useEnquete();
  const route = useRouter();

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

  const redirectToPage = () => {
    route.push(`/enquete/${enquete.id}`);
  };

  return (
    <div className='card'>
      {isEditing ? (
        <input
          type='text'
          value={text}
          onChange={handleChange}
          data-testid={`input-enquete-${enquete.id}`}
          className='input'
        />
      ) : (
        <p
          className='text-lg font-semibold cursor-pointer hover-text'
          data-testid={`text-enquete-${enquete.id}`}
          onClick={redirectToPage}
        >
          {text}
        </p>
      )}
      <div className='flex gap-1'>
        <button
          onClick={handleEdit}
          className='btn-hover'
          data-testid={`edit-enquete-${enquete.id}`}
        >
          <FaPenSquare color='yellow' size={30} />
        </button>
        <button
          disabled={!isEditing}
          data-testid={`save-enquete-${enquete.id}`}
          onClick={handleSave}
          className='btn-hover'
        >
          <FaSave color='green' size={30} />
        </button>
        <button
          onClick={handleDelete}
          data-testid={`delete-enquete-${enquete.id}`}
          className='btn-hover'
        >
          <FaTrash color='red' size={30} />
        </button>
      </div>
    </div>
  );
};

export default EditableText;
