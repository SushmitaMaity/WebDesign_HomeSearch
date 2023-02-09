import React from 'react';
import './AboutUs.scss';

export class AboutUs extends React.Component {
  render() {
    return (
      <div className='mainAboutUs'>
        <div className='aboutUsMain'>
          <div className='aboutusImage'>
            <img src='/assets/AboutUs1.jpg' alt='home' />
            <h1 className='aboutUsTitle'>HomesByASAP</h1>
            <h6 className='aboutUsTag'>- Your dream home awaits - </h6>
          </div>
        </div>

        <div className='aboutUsContent'>
          <h2 className='aboutUsFont'>
            {' '}
            HomesByASAP, a platform that make the process of selling, buying and
            renting a transparent and nearly seamless end-to-end service.{' '}
          </h2>
        </div>
        <br />

        <div className='aboutUsCards'>
          <div className='row mt-3'>
            <div className='col-lg-4 col-md-3 mb-4'>
              <div className='card h-100'>
                <img
                  alt='House'
                  className='card-img-top img-fluid mx-auto h-50'
                  src='/assets/aboutUs_1.jpg'
                />
                <div className='card-body h-25'>
                  <h4 className='card-title'>Buy your dream house</h4>
                  <br />
                  <p>
                    Write your own contract and save the seller thousands with
                    our services.Get notified when the perfect home hits the
                    market, and book a tour to see it in person. Tour one home
                    or 100—we will guide you through the process to get you to
                    the right one.
                  </p>
                </div>
              </div>
            </div>

            <div className='col-lg-4 col-md-3 mb-4'>
              <div className='card h-100'>
                <img
                  alt='House'
                  className='card-img-top img-fluid mx-auto h-50'
                  src='/assets/aboutUs_2.jpg'
                />
                <div className='card-body h-25'>
                  <h4 className='card-title'>Sell at the right price</h4>
                  <br />
                  <p>
                    {' '}
                    Transparent guidance, data-driven insights, and thoughtful
                    interaction with the Agent, equip you with the knowledge you
                    need to monitor your home’s equity, identify when to sell,
                    and maximize your home sale.
                  </p>
                </div>
              </div>
            </div>

            <div className='col-lg-4 col-md-3 mb-4'>
              <div className='card h-100'>
                <img
                  alt='House'
                  className='card-img-top img-fluid mx-auto h-50'
                  src='/assets/aboutUs_3.jpg'
                />
                <div className='card-body h-25'>
                  <h4 className='card-title'>Get Local Info</h4>
                  <br />
                  <p>
                    {' '}
                    Does it have pet-friendly rentals? What are the crime rates?
                    How are the schools? Get important local information on the
                    area you're most interested in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
