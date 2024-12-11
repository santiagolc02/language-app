import './VocabWord.css'
import { useLanguage } from '../../context/LanguageContext';

const VocabWord = ({ item }) => {
    const { language } = useLanguage(); // Get setLanguage from context

    return (
        <div className="vocab-word">
            {item.word_type === 'Noun' && language === 'German'  ? (
                <p>{item.word.charAt(0).toUpperCase() + item.word.slice(1)}</p>
            ) : (
                <p>{item.word}</p>
            )}
        </div>
    )
}

export default VocabWord
