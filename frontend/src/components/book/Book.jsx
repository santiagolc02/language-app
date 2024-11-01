import './Book.css'

const Book = ({ LectureData }) => {
    return (
        <div className='book'>
            <img src={`/assets/imgtest.jpg`} className='book-img'></img>
            <div className="book-info">
                <p>{LectureData.name}</p>
                <p>{LectureData.level}</p>
            </div>
        </div>
    )
}

export default Book
