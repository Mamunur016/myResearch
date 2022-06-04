import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const AddNew = () => {
    const { user } = useAuth();
    const history = useHistory();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {

        // console.log(data);
        axios.post('http://localhost:5000/services', data)
            .then(res => {
                if (res.data.insertedId) {
                    swal({
                        title: "Good job!",
                        text: "You add a product!",
                        icon: "success",
                    });
                    reset();
                }
            })
        // history.push('/thankyou')
    };

    return (
        <div className='py-5' style={{
            backgroundColor: '#D4E3E5'
        }}>
            <Container>
                <h3>Hey <span className='text-primary'>{user.displayName} ,</span> <small>Please add a new Product</small></h3>

                <form className="rounded py-5" onSubmit={handleSubmit(onSubmit)}>





                    <input placeholder="Add a Product Company Name" defaultValue="" {...register("name")} required className='form-control my-3' />
                    <input placeholder="Add a Product Model" defaultValue="" {...register("model")} required className='form-control my-3' />


                    <input placeholder="Add a Product image url" type='url' defaultValue="" {...register("img")} required className='form-control my-3' />

                    <input placeholder="Add a Product Configuration" type='number' defaultValue="" {...register("config")} required className='form-control my-3' />

                    <input placeholder="Add a Product Category" defaultValue="" {...register("category")} required className='form-control my-3' />

                    <input placeholder="Add a Product Release Date" defaultValue="" {...register("dateR")} required className='form-control my-3' />

                    <input placeholder="Add a Product Made In Country" type='number' defaultValue="" {...register("madeIn")} required className='form-control my-3' />

                    <textarea placeholder="Add a Product Description" rows="5" className='my-4 form-control' defaultValue="" {...register("description")} required />

                    <input type="number" placeholder='Product Price' {...register("price")} required className='form-control my-3' />

                    <input type="submit" value='Submit' className=' btn btn-lg my-2 btn-outline-success  fw-bold' />
                </form>

            </Container>

        </div>
    );
};

export default AddNew;