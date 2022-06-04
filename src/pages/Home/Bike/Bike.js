import axios from 'axios';
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import useAuth from '../../../Hooks/useAuth';

const Bike = ({ bike }) => {
    // console.log(bike);
    const { user } = useAuth();

    const handleAddToCart = () => {

        const data = {
            id: _id,
            email: user.email,
            img,
            description,
            model,
            price,
            config
        }

        console.log(data);
        axios.post('http://localhost:5000/carts', data)
            .then(res => {
                if (res.data.insertedId) {
                    swal({
                        title: "Good job!",
                        text: "add to cart successfully !",
                        icon: "success",
                    })
                        .then((update) => {

                        })


                }
            })
    }
    const { name, model, price, img, description, _id, engine, config } = bike;
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
                                <b>{config}</b>
                            </div>
                            <div className='text-danger'>
                                <b>Price: {price} BDT</b>
                            </div>
                        </div>
                    </Card.Body>
                    <Card.Footer className='border-0 bg-white text-center '>


                        {
                            user?.email && <button className="btn btn-outline-primary me-4" onClick={() => handleAddToCart()}>Add to Cart</button>
                        }


                        <Link to={`/bike/${_id}`} >
                            <button className="btn btn-outline-success">Order Now</button>
                        </Link>

                    </Card.Footer>
                </Card>
            </Col>
        </div>
    );
};

export default Bike;