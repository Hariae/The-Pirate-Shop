import React, { Component } from 'react';
import Home from './Home/Home';
import Cart from './Cart/Cart';

//Entry Point of the application
class Main extends Component {

    constructor(props) {
        super(props);

        //Initialization
        this.state = {
            homePageView: true,
            cartPageView: false,
            products: [
                { Title: "Star Wars Episode IV DVD", Price: 20, TotalPrice: 20, Count: 1 },
                { Title: "Star Wars Episode V DVD", Price: 20, TotalPrice: 20, Count: 1 },
                { Title: "Star Wars Episode VI DVD", Price: 20, TotalPrice: 20, Count: 1 },
                { Title: "Star Wars Episode IV Blu-Ray", Price: 25, TotalPrice: 25, Count: 1 },
                { Title: "Star Wars Episode V Blu-Ray", Price: 25, TotalPrice: 25, Count: 1 },
                { Title: "Star Wars Episode VI Blu-Ray", Price: 25, TotalPrice: 25, Count: 1 }
            ],
            cart: []
        }

        //bind
        this.addToCart = this.addToCart.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this);
    }

    //Add item to cart
    addToCart = (event) => {
        const target = event.target;
        var product = this.state.products[target.id];
        var cartArray = this.state.cart;
        console.log('product', product);
        var push = true;

        //To prevent adding the same item twice to the cart
        for (var i = 0; i < cartArray.length; i++) {
            console.log('inside array');
            if (cartArray[i].Title === product.Title) {
                push = false;
            }
        }

        if (push === true) {
            cartArray.push(product);
        }

        console.log(cartArray);
        this.setState({
            cart: cartArray,
            cartPageView: true,
            homePageView: false
        });

    }

    //Back to Shopping
    redirectToHome = () => {
        this.setState({
            homePageView: true,
            cartPageView: false
        });
    }


    render() {

        //Toggle Pages
        let homePage = null;
        if (this.state.homePageView === true) {
            homePage = <Home products={this.state.products} addToCart={this.addToCart} />
        }

        let cartPage = null;
        if (this.state.cartPageView === true) {
            cartPage = <Cart cart={this.state.cart} products={this.state.products} redirectToHome={this.redirectToHome} />
        }


        return (
            <div>
                <div className="header container center-content">
                    <h1>The Piratical Liz's store</h1>
                </div>
                <div>
                    {homePage}
                    {cartPage}
                </div>
            </div>
        );
    }
}

export default Main;