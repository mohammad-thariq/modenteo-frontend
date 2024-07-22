import React from "react";
import DOMPurify from "dompurify";

const DangerousHTML = ({ html, product }) => {
  const sanitizedHtmlContent = DOMPurify.sanitize(html);

  return (
    <div
      className={product ? "" : "webPage-description-card"}
      dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
    />
  );
};
export default DangerousHTML;
