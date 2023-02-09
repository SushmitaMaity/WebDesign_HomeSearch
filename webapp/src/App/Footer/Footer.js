import React from "react";
import './Footer.scss';
export class Footer extends React.Component {

    render() {
        return (
            <div>
                <footer className="page-footer font-small colorbg pt-4 mt-4">

                    <div>
                        <div className="container">

                            <div className="row py-4 d-flex align-items-center">

                            </div>

                        </div>
                    </div>

                    <div className="container text-center text-md-left mt-5">

                        <div className="row mt-3 white-text">

                            <div className="col-md-3 col-lg-4 col-xl-3 mb-4">

                                <h6 className="text-uppercase font-weight-bold">HomesByASAP</h6>
                                <p>HomesByASAP offers you a wholsesome experience of choosing your dream home! Rent, Buy and Sell in ease!</p>

                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                                <h6 className="text-uppercase font-weight-bold">Features</h6>
                                <p>
                                    Rent out Rooms
                                </p>
                                <p>
                                    Find Accomodations
                                </p>
                                <p>
                                    In All Major Cities
                                </p>

                            </div>


                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                                <h6 className="text-uppercase font-weight-bold">Explore</h6>
                                {/* <p>
                                <a class="dark-grey-text" href="/favorites/">Your Favorites</a>
                                </p> */}
                                <p>
                                    <a className="dark-grey-text" href="/buyerViewListing">Buy</a>
                                </p>
                                <p>
                                    <a className="dark-grey-text" href="/sellerHome">Sell</a>
                                </p>
                                <p>
                                    <a className="dark-grey-text" >Rent</a>
                                </p>

                            </div>



                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                                <h6 className="text-uppercase font-weight-bold">Contact</h6>
                                <p>
                                    <i className="fas fa-home mr-3"></i> Boston, MA 02120, US</p>
                                {/* <p> */}
                                {/* <i class="fas fa-envelope mr-3"></i> homesbyasap@asap.com</p> */}
                                <p>
                                    <i className="fas fa-phone mr-3"></i> + 01 254 547 66</p>
                                <p>
                                    <i className="fas fa-print mr-3"></i> + 01 234 567 89</p>

                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright text-center text-black-50 py-3">© 2021 Copyright:
                        <a className="dark-grey-text" href="/"> HomesByASAP.com</a>
                    </div>
                </footer>
            </div>

        )
    }
}