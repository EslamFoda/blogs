import { Link } from 'react-router-dom';
import './Hero.css'
const Hero = () => {
    return ( 
        <div className='hero'>
                <h1>Welcome to My Blog</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam quia maxime fugit rem dolor, repellat praesentium vel earum saepe fuga!</p>
                <Link className='create' to='/create'>Create Post</Link>
            </div>
     );
}
 
export default Hero;