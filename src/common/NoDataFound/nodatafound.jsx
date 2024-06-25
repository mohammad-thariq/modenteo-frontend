import React from "react";
const NoDataFound = ({ noHeader, message, messageContent }) => {
    const defaultMessage =
        "Whoopsie daisy! It looks like the data decided to play hide-and-seek";
    const defaultMessageContent =
        "While we banish them back to the digital realm, please make sure everything is fine from your side";
    return (
        <div className="noData-wrapper">
            <img src="/assets/images/noDataFound.svg" alt="not-found" />
            <div className="noData-message-wrapper">
                <h4 className="noData-message">{message || defaultMessage}</h4>
                <p style={{ width: "360px" }}>
                    {messageContent || defaultMessageContent}
                </p>
            </div>
        </div>
    )
}
export default NoDataFound;