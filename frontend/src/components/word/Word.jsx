import './Word.css';

const Word = ({ word, onWordClick, dbWords }) => {
    const isInDatabase = dbWords.some(dbWord => dbWord.word === word.toLowerCase());
    
    const handleClick = () => {
        onWordClick(word);
    }
    
    return (
        <div className={isInDatabase ? 'known-word' : 'unknown-word'} onClick={handleClick}>
            <span className='word-text'>{word}</span>
        </div>
    );
}

export default Word;