import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import Rating from 'react-rating';
import Review from '../Review/Review';


const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);

    return (
        <div className='news-container pb-5 pt-4 ' >
            <Container>
                <h2 className='text-center text-danger py-3'>CLIENT REVIEWS</h2>
                <h5 className='text-center text-muted py-3'>It’s always the word of mouth that’s the best advice. Here are some of our…</h5>
            </Container>

            <Carousel className='py-5 carousel slide' data-bs-ride="carousel">
                {


                    reviews.map(review =>
                        <Carousel.Item interval={3000} style={{ minHeight: "200px" }} >
                            <div>
                                <Row>
                                    <Col md={4}>
                                        <div className='text-center'>
                                            <img src={review.img} alt="" style={{
                                                width: "250px",
                                                height: "220px",
                                                borderRadius: "3px"
                                            }} />

                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <h4 className='text-success'>{review.title}</h4>

                                        <p className=''><small>{review.description.substr(0, 1000)}</small></p>

                                        <p>
                                            <Rating readonly
                                                initialRating={review.star}
                                                emptySymbol="far fa-star icon-color"
                                                fullSymbol="fas fa-star icon-color"
                                            ></Rating>
                                        </p>
                                        <p className="text-danger fw-bold">{review.name}</p>
                                    </Col>


                                </Row>
                            </div>
                        </Carousel.Item>

                    )




                }
            </Carousel>

            {/* <Row xl={3} lg={2} md={2} sm={1} xs={1} className='g-3'>
                {

                    reviews.map(review => <Review
                        review={review}
                        key={review.id}
                    ></Review>)




                }
            </Row> */}

        </div >
    );
};

export default Reviews;