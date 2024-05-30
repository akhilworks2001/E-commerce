import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart';
import { useDispatch, useSelector } from 'react-redux';
import { addCartStart } from '../redux/actions/cart.action';

export default function ProductItems({product}) {
    const currentLogindedUser = useSelector(state => state.user.currentLoginedUser);
    const currentCart = useSelector(state => state.cart.currentCart);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let [addCart] = useCart({...currentCart}, {...currentLogindedUser})


    const addToCart = () => {

        if(!currentLogindedUser.name) {
            navigate('/login')
        }

        let response = addCart(product)
        console.log(response);

        dispatch(addCartStart(response))
    }

    return (
        <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="rounded position-relative fruite-item">
                <Link to={`/product-details/${product.id}`}>
                    <div className="fruite-img">
                        <img src={product.image} className="img-fluid w-100 rounded-top" alt={product.name} />
                    </div>    
                </Link>
                <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}>{product.category}</div>
                <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                <Link to={`/product-details/${product.id}`}><h4>{product.name}</h4></Link>
                    <p>{product.shortDescription}</p>
                    <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">$ {product.price}</p>
                        <button onClick={addToCart} className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
