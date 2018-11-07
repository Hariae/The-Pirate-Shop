import React, { Component } from 'react';


/**The Home page is the landing page. This page lists the products available and has the option to add 
 * products to cart. Clicking on add cart takes the user to cart. 
 */

class Home extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
        }
    }

    render() {
        //let productList = null;
        let productList = this.props.products.map((product, index) => {
            return (
                <div className="col-4 center-content pad-1-pc" key={index}>
                    <div className="pad-1-pc product-container">
                        <div className="product-title"><b>{product.Title}</b></div>
                        <br />
                        <div><img src="https://lumiere-a.akamaihd.net/v1/images/og-generic_02031d2b.png?region=0%2C0%2C1200%2C1200" alt="img"></img></div>
                        <br />
                        <div><b>${product.Price}</b></div>
                        <br />
                        <div><button className="btn btn-md btn-success" id={index} onClick={this.props.addToCart}>Add to cart</button></div>
                    </div>
                </div>

            );
        });

        return (
            <div className="container">
                <div className="pad-10-pc">

                    <div className="row">
                        {productList}
                    </div>
                </div>
            </div>

        );
    }
}

export default Home;