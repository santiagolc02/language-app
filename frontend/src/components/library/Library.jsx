import './Library.css'
import Navbar from '../navbar/Navbar';
import Shelf from '../shelf/Shelf';
//import {motion} from 'framer-motion'

const Library = () => {
    return (
        <div className="library">
            <Navbar></Navbar>
            <Shelf></Shelf>
            
        </div>
    )
}

export default Library
