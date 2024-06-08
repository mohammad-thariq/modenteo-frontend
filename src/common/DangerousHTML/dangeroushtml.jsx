import React from "react";
import DOMPurify from 'dompurify';

const DangerousHTML = ({ html }) => {
    const sanitizedHtmlContent = DOMPurify.sanitize(html);

    return (
        <div dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }} />
    )
}
export default DangerousHTML;