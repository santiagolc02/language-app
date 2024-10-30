import './Language.css'

const Language = ({ props }) => {
    return (
        <div className='language'>
            <img src={`/assets/${props.code}.png`} className='language-img' alt="Example" />
        </div>
    )
}

export default Language
