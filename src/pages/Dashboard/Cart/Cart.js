import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import useAuth from '../../../Hooks/useAuth';

const Cart = () => {
    const { user } = useAuth();
    const [carts, setcarts] = useState([]);


    useEffect(() => {
        const url = `http://localhost:5000/carts/${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setcarts(data))
    }, [carts]);

    // DELETE AN Order
    const handleDeleteCart = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this  file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    const url = `http://localhost:5000/carts/${id}`;
                    fetch(url, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                swal({
                                    title: "Good job!",
                                    text: "deleted successfully !",
                                    icon: "success",
                                });
                                const remainingcarts = carts.filter(user => user.id !== id);
                                setcarts(remainingcarts);
                            }
                        });
                } else {
                    swal("Your  file is safe!");
                }
            });



    }






    return (
        <div className='py-5 bg-light'>
            <Container>

                <h3 className='text-success'> Hey {user.displayName}</h3>
                <h2 className='py-3 text-primary'>Your Cart Item: {carts.length} </h2>

                {
                    (carts.length > 0) && <div>

                        <Row lg={3} md={2} sm={1} xs={1} className='g-3'>
                            {
                                carts.map(cart => <Tabel
                                    key={cart._id}
                                    cart={cart}
                                    handleDeleteCart={handleDeleteCart}
                                ></Tabel>)
                            }
                        </Row>

                    </div>
                }
            </Container>
        </div>
    );
};

// table component
const Tabel = (props) => {
    const { speed, price, model, email, _id, id, img, description } = props.cart;
    const handleDeleteCart = props.handleDeleteCart;

    return (
        <div>
            <Col>
                <Card className='p-3 border-0 shadow rounded-3' style={{ minHeight: "600px" }}>
                    <div className='text-center'>
                        <Card.Img variant="top" src={img} className='img-fluid' />
                    </div>

                    <Card.Body>

                        <Card.Title className='text-success'>{model}</Card.Title>

                        <Card.Text>
                            {description.substr(0, 150)}
                        </Card.Text>
                        <div className='d-flex justify-content-between pt-2'>
                            <div className='text-info'>
                                <b>Top-speed: {speed}</b>
                            </div>
                            <div className='text-danger'>
                                <b>Price: {price} BDT</b>
                            </div>
                        </div>
                    </Card.Body>
                    <Card.Footer className='border-0 bg-white text-center '>


                        {
                            <button className='btn  btn-outline-danger me-4' onClick={() => handleDeleteCart(id)}>Remove</button>
                        }


                        <Link to={`/product/${id}`} >
                            <button className="btn btn-outline-success">Order Now</button>
                        </Link>

                    </Card.Footer>
                </Card>
            </Col>
        </div>



    );
};

export default Cart;