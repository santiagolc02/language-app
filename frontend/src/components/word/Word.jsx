import './Word.css'

const Word = ({ word }) => {
    return (
        <div className='word'>
            <span className='word-text'>{word}</span>
        </div>
    )
}

export default Word