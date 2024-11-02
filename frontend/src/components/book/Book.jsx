import './Book.css'
import { useNavigate } from 'react-router-dom';
import { useLectureId } from '../../context/LectureContext';

const Book = ({ LectureData }) => {
    const { setLectureId } = useLectureId(); // Get setLanguage from context
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/reading'); // Navigate to the Lectures page
        setLectureId(LectureData.id);
    }

    return (
        <div className='book' onClick={handleClick}>
            <img src={`/assets/imgtest.jpg`} alt='' className='book-img'></img>
            <div className="book-info">
                <p>{LectureData.name}</p>
                <p>{LectureData.level}</p>
            </div>
        </div>
    )
}

export default Book
