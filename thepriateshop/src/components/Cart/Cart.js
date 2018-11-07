import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Cart extends Component {

    constructor(props) {
        super(props);

        var totalCost = 0;
        var dvdDiscount = 0;
        var blurayDiscount = 0;



        this.state = {
            totalCost: totalCost,
            discount: dvdDiscount + blurayDiscount,
            countChanged: true,
            itemDeleted: false
        }



        //bind
        this.calculateBill = this.calculateBill.bind(this);

    }

    //To track the item count
    countChange = (Parameter, event) => {
        const target = event.target;
        const id = target.id;
        if(id === "increase"){
            this.props.cart[Parameter].Count++;
        }
        else if(id === "reduce"){
            this.props.cart[Parameter].Count--;
        }
        
        this.props.cart[Parameter].TotalPrice = this.props.cart[Parameter].Price * this.props.cart[Parameter].Count;
        this.calculateBill();

        this.setState({
            countChanged: !this.state.countChanged
        })
    }

    //Calculate total, Discount and line item prices
    calculateBill = () => {

        var totalCost = 0;
        var dvdDiscount = 0;
        var blurayDiscount = 0;

       
        //Count items
        var dvdTotalCount = 0, blurayTotalCount = 0;

        for (var k = 0; k < this.props.products.length; k++) {
            if (this.props.products[k].Title.indexOf("DVD") !== -1) {
                dvdTotalCount++;
            }
            if (this.props.products[k].Title.indexOf("Blu-Ray") !== -1) {
                blurayTotalCount++;
            }
        }

        //Calculate Discount
        var dvdCount = 0;
        var blurayCount = 0;

        for (var j = 0; j < this.props.cart.length; j++) {
            if (this.props.cart[j].Title.indexOf("DVD") !== -1) {
                dvdCount++;
                dvdDiscount = dvdDiscount + 0.1 * this.props.cart[j].TotalPrice;

            }
            if (this.props.cart[j].Title.indexOf("Blu-Ray") !== -1) {
                blurayCount++;
                blurayDiscount = blurayDiscount + 0.15 * this.props.cart[j].TotalPrice;
            }
        }

        //Applying discount if applicable
        if (dvdCount !== dvdTotalCount) {
            dvdDiscount = 0;
        }
        if (blurayCount !== blurayTotalCount) {
            blurayDiscount = 0;
        }

        //Total cost calculation
        for (var i = 0; i < this.props.cart.length; i++) {
            totalCost += this.props.cart[i].TotalPrice;
        }

        //Bulk discount calculation
        var bulkDiscount = 0;
        var totalCount = 0;

        for (var x = 0; x < this.props.cart.length; x++) {
            totalCount = totalCount + this.props.cart[x].Count;
        }

        if (totalCount >= 100) {
            bulkDiscount = 0.05 * totalCost;
        }

        this.setState({
            totalCost: totalCost,
            discount: dvdDiscount + blurayDiscount + bulkDiscount
        });
    }

    //delete an item in the cart
    deleteCartItem = (event) => {
        const target = event.target;
        const index = target.id;

        this.props.cart.splice(index, 1);
        this.setState({
            itemDeleted: !this.state.itemDeleted
        });
        this.calculateBill();
    }


    componentDidMount() {
        this.calculateBill();
    }


    render() {

        let cartProducts = this.props.cart.map((product, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td><b>{product.Title}</b></td>
                    <td>
                        <button className="btn btn-sm btn-success" id="reduce" onClick={this.countChange.bind(this, index)}>-</button>
                        <b>{product.Count} </b>
                        <button className="btn btn-sm btn-success" id="increase" onClick={this.countChange.bind(this, index)}>+</button>
                    </td>
                    <td><b>{product.TotalPrice}</b></td>
                    <td><button className="btn btn-md btn-danger" id={index} onClick={this.deleteCartItem.bind(this)}>Delete</button></td>
                </tr>
            );
        })

        return (
            <div className="container">
                <Link to="#" onClick={this.props.redirectToHome}>Back to Shopping</Link>
                <div className="center-content pad-10-pc">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product name</th>
                                <th scope="col">Product Price</th>
                                <th scope="col">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartProducts}
                        </tbody>
                    </table>
                    <div className="cost-container flt-right">
                        <div className="discount-tab">
                            <span>Discount: </span>
                            <span>${this.state.discount}</span>
                        </div>
                        <div className="cost-tab">
                            <span>Total: </span>
                            <span>${this.state.totalCost - this.state.discount}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;