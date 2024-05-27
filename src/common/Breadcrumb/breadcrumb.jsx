import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';
import '../../styles/breadcrumb.css';

const Breadcrumb = () => {
    const location = useLocation();
    const paths = location.pathname.split('/').filter(path => path !== ''); // Split URL path into segments

    return (
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <div className="container">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                        <IonIcon icon={chevronForwardOutline} />
                    </li>

                    {paths.map((path, index) => {
                        const pathTo = '/' + paths.slice(0, index + 1).join('/');
                        const isLast = index === paths.length - 1;
                        return (
                            <li key={index} className={`breadcrumb-item ${isLast ? 'active' : ''}`} aria-current={isLast ? 'page' : undefined}>
                                <Link to={pathTo}>{path}</Link>
                                {!isLast && <IonIcon icon={chevronForwardOutline} />}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumb;
