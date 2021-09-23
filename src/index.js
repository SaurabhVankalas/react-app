import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

let link1 = document.createElement("link");
link1.rel = "stylesheet";
link1.href = "styles.css";
document.head.appendChild(link1);
let link2 = document.createElement("link");
link2.rel = "stylesheet";
link2.href =
  "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
document.head.appendChild(link2);
let link3 = document.createElement("link");
link3.rel = "stylesheet";
link3.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
document.head.appendChild(link3);
let script1 = document.createElement("script");
script1.src =
  "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
document.head.appendChild(script1);
let script2 = document.createElement("script");
script2.src =
  "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js";
let title = document.getElementsByTagName("title")[0];
title.innerHTML = "Store";

const data = {
  shirts: [
    {
      id: 5,
      title: "Shirt 5",
      img_src: "https://picsum.photos/200/300",
      description:
        "Lorem ipsum dolor sit amet, vivendo sapientem qui ad, sed ut inani iudicabit, eros ullum putent mel at. Vix eu wisi labitur invidunt. Prima postea at pri, cu vix mundi saepe everti. Ea omittam blandit insolens sed. Cum lucilius prodesset ad, vix an nulla graeco. Cu officiis quaestio abhorreant ius, cu laudem adversarium eum.",
      price: "$12"
    },
    {
      id: 6,
      title: "Shirt 6",
      img_src: "https://source.unsplash.com/random",
      description:
        "Lorem ipsum dolor sit amet, vivendo sapientem qui ad, sed ut inani iudicabit, eros ullum putent mel at. Vix eu wisi labitur invidunt. Prima postea at pri, cu vix mundi saepe everti. Ea omittam blandit insolens sed. Cum lucilius prodesset ad, vix an nulla graeco. Cu officiis quaestio abhorreant ius, cu laudem adversarium eum.",
      price: "$14"
    },
    {
      id: 7,
      title: "Shirt 7",
      img_src: "https://picsum.photos/200/300",
      description:
        "Lorem ipsum dolor sit amet, vivendo sapientem qui ad, sed ut inani iudicabit, eros ullum putent mel at. Vix eu wisi labitur invidunt. Prima postea at pri, cu vix mundi saepe everti. Ea omittam blandit insolens sed. Cum lucilius prodesset ad, vix an nulla graeco. Cu officiis quaestio abhorreant ius, cu laudem adversarium eum.",
      price: "$99"
    },
    {
      id: 8,
      title: "Shirt 8",
      img_src: "https://source.unsplash.com/random",
      description:
        "Lorem ipsum dolor sit amet, vivendo sapientem qui ad, sed ut inani iudicabit, eros ullum putent mel at. Vix eu wisi labitur invidunt. Prima postea at pri, cu vix mundi saepe everti. Ea omittam blandit insolens sed. Cum lucilius prodesset ad, vix an nulla graeco. Cu officiis quaestio abhorreant ius, cu laudem adversarium eum.",
      price: "$67"
    }
  ]
};

class Shopitem extends React.Component {
  render() {
    return (
      <div className="shop-item">
        <span className="shop-item-title">{this.props.shirt.title}</span>
        <img className="shop-item-image" src={this.props.shirt.img_src} />
        <div className="shop-item-details">
          <p>{this.props.shirt.description}</p>
        </div>
        <span className="shop-item-price">{this.props.shirt.price}</span>
        <button
          className="btn btn-primary shop-item-button"
          type="button"
          onClick={this.props.onClick}
          disabled={this.props.dis}
        >
          ADD TO CART
        </button>
      </div>
    );
  }
}

class Dropdown extends React.Component {
  render() {
    return (
      <div>
        <img
          src={this.props.itm.img_src}
          alt={"na"}
          height={"50px"}
          width={"50px"}
        ></img>
        <a>
          {this.props.itm.title} : [ {this.props.itm.price} ]
        </a>
        <button className="rm_btn" onClick={this.props.onClick}>
          D
        </button>
      </div>
    );
  }
}

class App extends React.Component {
  add_shoplist = [];
  shoplist_ids = [];
  rows = [];
  flag = 0;
  constructor(props) {
    super(props);
    this.state = {
      item_id: null,
      count: 0,
      disabled: false
    };
  }
  rm_handleClick(ittm_id) {
    this.setState({
      count: this.state.count - 1
    });
    for (var k = 0; k < this.shoplist_ids.length; k++) {
      if (this.shoplist_ids[k] === ittm_id) {
        this.add_shoplist.splice(k, 1);
        this.shoplist_ids.splice(k, 1);
        break;
      }
    }
  }
  handleClick(i) {
    this.setState({
      item_id: i.id,
      count: this.state.count + 1,
      disabled: true
    });
    if (this.shoplist_ids.length >= 1) {
      for (var j = 0; j < this.shoplist_ids.length; j++) {
        if (this.shoplist_ids[j] === i.id) {
          alert("Item is Already in the cart!");
          this.flag = 1;
          break;
        }
      }
      if (this.flag === 0) {
        this.add_shoplist.push(
          <Dropdown
            itm={i}
            onClick={() => this.rm_handleClick(i.id)}
          ></Dropdown>
        );
        this.shoplist_ids.push(i.id);
      }
    } else {
      this.add_shoplist.push(
        <Dropdown itm={i} onClick={() => this.rm_handleClick(i.id)}></Dropdown>
      );
      this.shoplist_ids.push(i.id);
    }
    this.flag = 0;
  }

  generate_data() {
    for (var i = 0; i < data.shirts.length; i++) {
      let shirt_obj = data.shirts[i];
      this.rows.push(
        <Shopitem
          shirt={data.shirts[i]}
          onClick={() => this.handleClick(shirt_obj)}
          dis={this.state.disabled}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <header className="main-header">
          <nav className="main-nav nav">
            <ul>
              <li>
                <a href={"index.html"}>HOME</a>
              </li>
              <li>
                <a href={"new_store.html"}>STORE</a>
              </li>
              <li>
                <a href={"about.html"}>ABOUT</a>
              </li>
              <div className="dropdown">
                <button className="dropbtn">
                  <span className="glyphicon glyphicon-shopping-cart">[</span>
                  <span id="output">{this.add_shoplist.length}</span>
                  <span>]</span>
                </button>
                <div className="dropdown-content">{this.add_shoplist}</div>
              </div>
              <button className="button" onClick={() => alert("clicked!")}>
                Add 4 shirts
              </button>
            </ul>
          </nav>
          <h1 className="band-name band-name-large">My stores</h1>
        </header>
        <h2 className="section-header">Shirts</h2>
        <div className="shop-items">
          {this.generate_data()}
          {this.rows}
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
