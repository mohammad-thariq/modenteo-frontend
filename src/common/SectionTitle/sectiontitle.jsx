import React from "react";
const SectionTitle = ({ title, subtitle }) => {
    return (
        <div>
            <h2 className='sectitle text-center'>{title}</h2>
            <p className='subtitle pb-3'>{subtitle}</p>
        </div>
    )
}
export default SectionTitle;