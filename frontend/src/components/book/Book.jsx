import './Book.css'
import { useNavigate } from 'react-router-dom';
import { useLectureId } from '../../context/LectureContext';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const Book = ({ LectureData }) => {
    const { setLectureId } = useLectureId(); // Get setLanguage from context
    const { language } = useLanguage()
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/reading'); // Navigate to the Lectures page
        setLectureId(LectureData.id);
    }

    // Extract YouTube video ID and generate thumbnail URL
    const getThumbnailUrl = (videoUrl) => {
        const videoId = videoUrl.split('v=')[1];
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    };

    const thumbnailUrl = LectureData.video_url ? getThumbnailUrl(LectureData.video_url) : `/assets/${language}.png`;

    return (
        <motion.div className='book' onClick={handleClick} whileHover={{ y: -2 }}>
            <img src={thumbnailUrl} alt='' className='book-img'></img>
            <div className="book-info">
                <p>{LectureData.name}</p>
                <p>{LectureData.level}</p>
            </div>
        </motion.div>
    )
}

export default Book
