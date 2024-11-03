import './Word.css'

const Word = ({ word, setWord }) => {
    const handleClick = () => {
        setWord(word);
    }

    return (
        <div className='word' onClick={handleClick}>
            <span className='word-text'>{word}</span>
        </div>
    )
}

export default Word