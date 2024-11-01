import './Library.css'
import Navbar from '../navbar/Navbar';
import Shelf from '../shelf/Shelf';

const Library = () => {
    return (
        <div className="library">
            <Navbar></Navbar>
            <Shelf></Shelf>
            
        </div>
    )
}

export default Library
