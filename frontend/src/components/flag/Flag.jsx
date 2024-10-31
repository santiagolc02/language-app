import './Flag.css'
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

const Flag = ({ languageData, onClick }) => {
    const { setLanguage } = useLanguage(); // Get setLanguage from context

    const handleClick = () => {
        setLanguage(languageData.name); // Set the language in context
        onClick();
    };

    return (
        <motion.div className='flag' onClick={handleClick} whileHover={{y: -5}}>
            <img src={`/assets/${languageData.code}.png`} className='flag-img' alt={`${languageData.name}`} />
        </motion.div>
    )
}

export default Flag
