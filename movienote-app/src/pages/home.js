import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';

function Home() {

    const disc = useRef(null);
    let pos = 0;
    let direction = 1;
    const acc = 0.05;

    useEffect(() => {
        function bounce() {
            pos += direction * 5;
            direction -= acc;
            if (disc.current) {
                disc.current.style.bottom = pos + 'px';
            }

            if (pos <= 0) {
                direction = 1;
            }

            requestAnimationFrame(bounce);
        }

        requestAnimationFrame(bounce);
    }, []); 
   
    return (
    
    <div className="home">
        <h1>Welcome to MovieNote🍿</h1>
        <p>Keep count of the movies <a className="diff">to be watched</a>.</p>
        <FontAwesomeIcon ref={disc} className='cd'icon={faCompactDisc} />
    </div>

    )
}

export default Home;