import './Shelf.css'
import Book from '../book/Book';
import BookAdd from '../bookAdd/BookAdd';
const Shelf = ({ lectures, loading }) => {

    return (
        <div className="shelf">
            {loading ? (
                <p>Loading lectures...</p>
            ) : lectures.length > 0 ? (
                <>
                    {lectures.map((lecture) => (
                        <Book key={lecture.id}
                        LectureData = {lecture}>
                        </Book>
                    ))}
                    <BookAdd></BookAdd>
                </>
            ) : (
                <BookAdd></BookAdd>
            )}
        </div>
    )
}

export default Shelf
