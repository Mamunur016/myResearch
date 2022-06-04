import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Product from '../Product/Product';


const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);
    return (
        <div className='py-5' style={{
            background: "#E3E6E3"
        }}>
            <Container>
                <h3 className='text-center py-3 text-primary'>Featured Products
                </h3>
                <h5 className='text-center pb-3 text-success'>CHOOSE YOUR NEXT Product</h5>
                <Row lg={3} md={2} sm={1} xs={1} className='g-3'>
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                        ></Product>)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Products;