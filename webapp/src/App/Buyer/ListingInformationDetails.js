import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FactsandFeatures from './tabs/FactsandFeatures';
import HomeValue from './tabs/HomeValue';
import Overview from './tabs/Overview';
import './ListingInformationDetails.scss';

export class ListingInformationDetails extends React.Component {
    render() {
        // getting the card
        const cardInfo = this.props.cardInfo;

        return (

            <React.Fragment>
                <div class='buyerInformationDetails'>
                    <pre>
                        <price>${cardInfo.price}</price> | <bed>{cardInfo.beds} bed </bed> |{' '}
                        <bath>
                            {' '}
                            {cardInfo.baths} bath | <sqrft>{cardInfo.squareFeet} sqft </sqrft>
                        </bath>
                    </pre>
                    <pre>
                        {cardInfo.streetAddress} , {cardInfo.city}, {cardInfo.zipcode}
                    </pre>
                    <h6>{cardInfo.address}</h6>
                </div>

                {/* div for the tab feature */}
                <div className='buyerTabs'>
                    <Tabs defaultActiveKey='overview' className='myBuyerClass'>
                        {/* first tab */}
                        <Tab eventKey='overview' title='Overview'>
                            <Overview cardInfo={cardInfo} />
                        </Tab>
                        {/* second tab */}
                        <Tab eventKey='facts' title='Facts and Features'>
                            <FactsandFeatures cardInfo={cardInfo} />
                        </Tab>
                        {/* third tab */}
                        <Tab eventKey='homevalue' title='Home Value'>
                            <HomeValue cardInfo={cardInfo} />
                        </Tab>
                    </Tabs>
                </div>

            </React.Fragment>
        );
    }
}
