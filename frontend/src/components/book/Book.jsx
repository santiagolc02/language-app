import './Book.css'
import { useNavigate } from 'react-router-dom';
import { useLectureId } from '../../context/LectureContext';
import { motion } from 'framer-motion';

const Book = ({ LectureData }) => {
    const { setLectureId } = useLectureId(); // Get setLanguage from context
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/reading'); // Navigate to the Lectures page
        setLectureId(LectureData.id);
    }

    return (
        <motion.div className='book' onClick={handleClick} whileHover={{ y: -2 }}>
            <img src={`/assets/imgtest.jpg`} alt='' className='book-img'></img>
            <div className="book-info">
                <p>{LectureData.name}</p>
                <p>{LectureData.level}</p>
            </div>
        </motion.div>
    )
}

export default Book
