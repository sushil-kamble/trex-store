import React from 'react';
import Grid from '~/components/Grid';
import Sidebar from '~/components/Sidebar';

function page() {
    return (
        <div className="flex gap-4">
            <Sidebar />
            <Grid />
        </div>
    );
}

export default page;
