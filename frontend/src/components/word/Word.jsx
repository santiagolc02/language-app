import './Word.css';

const Word = ({ word, type, onWordClick, dbWords }) => {
    let isInDatabase = false;
    let wordClass = '';

    if (type === 'newline') {
        return <br />;
    }

    // Determine if the word is in the database if it's of type 'word'
    if (type === 'word') {
        isInDatabase = dbWords.some(dbWord => dbWord.word === word.toLowerCase());
    }

    // Assign the appropriate class based on type and presence in the database
    switch (type) {
        case 'symbol':
            wordClass = word === ' ' ? 'space' : 'symbol';
            break;
        case 'word':
            wordClass = isInDatabase ? 'known-word' : 'unknown-word';
            break;
        default:
            wordClass = '';
    }

    const handleClick = () => {
        if (type === 'word') {
            onWordClick(word);
        }
    }

    return (
        <div className={wordClass} onClick={handleClick}>
            <span className='word-text'>{word}</span>
        </div>
    );
}

export default Word;
