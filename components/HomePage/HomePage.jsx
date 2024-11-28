import React from 'react';

import Containt from './Containt';
import Banner from './Banner';

const HomePage = () => {
    return (
        <div >
            <div className='sticky top-0 '>

            <Banner />
            </div >
            <div className="">
            <Containt/>
            </div>
        </div>
    );
};

export default HomePage;

