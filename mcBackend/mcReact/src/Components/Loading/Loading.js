import React from 'react'
import { useLoading, Puff } from '@agney/react-loading';

const Loading = () => {
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <Puff width="50" />,
    });

    return (
        <div className="Loading">
            <br/>
            <br/>
            <h3>Classifying</h3>

            <section {...containerProps}>
            {indicatorEl} {/* renders only while loading */}
            </section>
        </div>
    )
}

export default Loading