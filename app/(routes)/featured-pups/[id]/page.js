import DonateNow from '@/components/FearuredPups/DonateNow/DonateNow';
import React from 'react';

const page = ({params}) => {

    
    return (
        <div>
            <DonateNow id={params.id}/>
        </div>
    );
};

export default page;