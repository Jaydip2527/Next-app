'use client';

import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Image from "next/image";
import { TabComponent } from '@syncfusion/ej2-react-navigations/src/tab/tab.component';
import { TabItemDirective , TabItemsDirective } from '@syncfusion/ej2-react-navigations/src/tab/items-directive';
import PricingCard from '@/@/component/pricing-card';
import logo from "../../../public/Images/logo.png";

export default function PricingPlan() {

    const tabRender = (tabs: string) => {
        if (tabs === "Monthly") {
            return <PricingCard />;
        } else if (tabs === "Annually") {
            return <PricingCard />;
        }
    };

    let headertext;
    // Mapping Tab items Header property
    // eslint-disable-next-line prefer-const
    headertext = [
        { text: 'Monthly' },
        { text: 'Annually' }];

    return (
        <>
            <Container>
                <div className="pricing_table_sec_main">
                    <div className="pricing_header_sec">
                        {/* <div className="our_plan_sec">
                            <div>
                                <Icon icon="radix-icons:dot-filled" width="16" height="16" />
                            </div>
                            <div>
                                <p className="our_plan_text"> OUR PLANS </p>
                            </div>
                        </div> */}
                        <div className='logo_img_div'>
                            <Image className="login_logo_img img-fluid" src={logo} alt="Logo" />
                        </div>

                        <div className="pricing_table_description">
                            <p className="pricing_table_description_info"> Choose Your Plan. </p>
                            <p className="pricing_table_description_info"> Get Started With 30-Days Free Trial </p>
                        </div>

                        <div className='pricing_tab_sec'>
                            {/* Render the Tab Component */}
                            <TabComponent
                                cssClass="responsive-mode"
                                heightAdjustMode="None"
                            >
                                <TabItemsDirective>
                                    <TabItemDirective
                                        header={headertext[0]}
                                        content={() => tabRender('Monthly')}
                                    />

                                    <TabItemDirective
                                        header={headertext[1]}
                                        content={() => tabRender('Annually')} 

                                    />
                                </TabItemsDirective>
                            </TabComponent>
                        </div>

                        {/* <div className="pricing_subdescription">
                            <p className="pricing_table_subdata_info"> Select from best plan, ensuring a perfect match. Need more or less?  </p>
                            <p className="pricing_table_subdata_info"> Customize your subscription for a seamless fit! </p>
                        </div> */}

                        {/* <div className="navigation_btn_sec">
                            <button className='common_btn' >
                                Customized Your Plan
                            </button>
                        </div> */}
                    </div>
                </div>
            </Container >
        </>
    );
}

