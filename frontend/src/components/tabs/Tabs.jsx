import './Tabs.css'

const Tabs = ({tab, setTab}) => {
    const handleTabChange = (tabName) => {
        console.log(tabName)
        setTab(tabName);
    };

    return (
        <div className="body">
            <div className={`tabs ${tab === 'vocabulary' ? 'active-1' : 'active-2'}`}
            style={{ '--active': tab, '--count': 2 }}>
                <input
                checked={tab === 'vocabulary'}
                value="vocabulary"
                name="vocabulary"
                id="html"
                type="radio"
                className="input"
                onChange={() => handleTabChange('vocabulary')}
                />
                <label htmlFor="html" className="label">Vocabulary</label>

                <input
                checked={tab === 'add'}
                value="add"
                name="add"
                id="css"
                type="radio"
                className="input"
                onChange={() => handleTabChange('add')}
                />
                <label htmlFor="css" className="label">Add word</label>
            </div>
        </div>
    )
}

export default Tabs
