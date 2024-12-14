import React from 'react';
import Grid from '~/components/Grid';
import Search from '~/components/Search';
import Sidebar from '~/components/Sidebar';

function page() {
    return (
        <div className="flex gap-4">
            <Sidebar />
            <div className="flex grow flex-col gap-4">
                <Search />
                <Grid />
            </div>
        </div>
    );
}

export default page;
