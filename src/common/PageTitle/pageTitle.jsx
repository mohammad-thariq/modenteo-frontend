import React from "react";


export const PageTitle = ({title, description}) => {
    const defaultTitle = "Modenteo";
    const defaultDescription = "Modenteo";
    return(
    <head>
        <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
        <meta
        name="description"
        content={description ||defaultDescription }
      />
    </head>
    )
}