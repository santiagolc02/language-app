import './Book.css'
import { useNavigate } from 'react-router-dom';
import { useLectureId } from '../../context/LectureContext';
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
        <div className='book' onClick={handleClick}>
            <img src={thumbnailUrl} alt='' className='book-img'></img>
            <div className="book-info">
                <p className='book-info-title'>{LectureData.name}</p>
                <p>{LectureData.level}</p>
            </div>
        </div>
    )
}

export default Book
