import { useState } from 'react';
import customToast from '../../toast/customToast';
import './index.css';

interface ProductProps {
  product: Product
}

interface Product{
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
}

interface ProductInCart {
  quantity: number;
  amount: number;
  product: Product;
}

export default function ProductCardComponent({product}: ProductProps){

  const [quantity, setQuantity] = useState<number>(1);

  function up(){
    if(quantity < 9){
      setQuantity(quantity+1);
    }
  }

  function down(){
    if(quantity > 1){
      setQuantity(quantity-1);
    }
  }

  function addProductToCart(){

    let cart: ProductInCart[] = [];
    const result = localStorage.getItem("cart");

    const item = {
      quantity: quantity,
      amount: product.price * quantity,
      product: product
    }

    if(!result){
      cart.push(item);
    }
    else{
      cart = JSON.parse(result);
      cart.push(item);
    }

    customToast.success("Produto adicionado ao carrinho");
    localStorage.setItem("cart", JSON.stringify(cart));
    
    console.log(cart);
    // console.log(product);
  }

  return(
    <div className='product-card'>
      <div className='product-card-image'>
        <img src={product.image} alt="" />
      </div>
      <div className='product-card-body'>
        <div>
          <b> {product.name} </b>
        </div>
        <div>
          {product.description}
        </div>
      </div>
      <div className='product-card-price'> R$ {product.price}</div>
      <div className='product-card-footer'>
        <div className="quantity">
          <div className='quantity-down' onClick={down}>-</div>
          <input type="number" min="1" max="9" step="1" value={quantity} readOnly />
          <div className='quantity-up' onClick={up}>+</div>
        </div>
        <div className='product-card-footer-btn-cart' onClick={addProductToCart}>
          <i className="fa-solid fa-cart-plus"></i>
        </div>
      </div>
    </div>
  )
}