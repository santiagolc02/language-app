import './BookAdd.css'
import { useBookModal } from '../../context/ModalContext';

const BookAdd = () => {
    const { setShowBookModal } = useBookModal(); // Get setLanguage from context
    
    const handleClick = () => {
        setShowBookModal(true);
    }

    return (
        <div className="book-add" onClick={handleClick}>
            <h1>+</h1>
        </div>
    )
}

export default BookAdd
