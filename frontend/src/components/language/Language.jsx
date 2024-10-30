import './Language.css'

const Language = ({ languageData, setLanguage }) => {
    const handleClick = () => {
        setLanguage(languageData.name);
    }

    return (
        <div className='language' onClick={handleClick}>
            <img src={`/assets/${languageData.code}.png`} className='language-img' alt={`${languageData.name}`} />
        </div>
    )
}

export default Language
