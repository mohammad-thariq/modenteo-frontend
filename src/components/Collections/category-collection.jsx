import React from 'react';
import '../../styles/category-collection.css'; 
import { SectionTitle } from '../../common';
import { imgURL } from '../../config';
import { getNextJsOptimizedUrl } from '../../helper/image';
const CategoryCollection = ({ data, header }) => {
    return (
        <section className="collections-sec">
            <div className="container">
                <div className="section_title1">
                    <SectionTitle title={header?.title} subtitle={header?.description} />
                </div>
                <div className="makechoice">
                    <div className="row">
                        {data.map((item, key) => {
                            return (
                                <div className="col-md-4 col-lg-4" key={key}>
                                    <a href={item?.page_url}>
                                        <div className="choises-outer" style={{ background: item?.bg_color }}>
                                            <div className="d-flex align-items-center">
                                                <p><b>{item?.badge}</b></p>
                                                <div>
                                                    {/* <img src={process.env.PUBLIC_URL + "/assets/images/img/winter.png"} alt="Snow" /> */}
                                                    <img src={getNextJsOptimizedUrl(imgURL + item.image, 96, 75)} alt={item?.badge} />
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryCollection;
