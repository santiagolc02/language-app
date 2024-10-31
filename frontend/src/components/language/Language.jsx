import './Language.css'
import { useLanguage } from '../../context/LanguageContext';

const Language = ({ languageData, onClick }) => {
    const { setLanguage } = useLanguage(); // Get setLanguage from context

    const handleClick = () => {
        setLanguage(languageData.name); // Set the language in context
        onClick();
    };

    return (
        <div className='language' onClick={handleClick}>
            <img src={`/assets/${languageData.code}.png`} className='language-img' alt={`${languageData.name}`} />
        </div>
    )
}

export default Language
