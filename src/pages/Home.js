import React, { Component, useState, useEffect } from 'react';
import Axios from 'axios';
import renderHTML from 'react-render-html';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SinglePost from '../components/SinglePost'
import LoadingEffect from '../components/Loading'

const Home = ({ keyword, postid, getPostID }) => {

    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [id, setID] = useState('post id')

    useEffect(() => {
        const postURL = 'https://kidsrctoys.com/admin/wp-json/wp/v2/posts'
        Axios.get(postURL)
            .then(posts => {
                setLoading(true)
                setPosts(posts.data)

                const results = posts.data.filter((product) => {

                    return product.title.rendered.toLowerCase().includes(keyword)
                })

                setPosts(results)



            })
            .catch(err => console.log(err))
    }, [keyword])


    return (
        <div className='container'>
            <div className="row">
                {
                    posts.map(products => {
                        // console.log('card data', products.acf)
                        return (
                            <div className="col-md-4 p-2" key={products.id}>
                                <div className="card">
                                    <Link onClick={() => getPostID(products.id)} to={`/${products.slug}`} className='text-decoration-none card-header text-body'><h6 >{products.title.rendered}</h6></Link>
                                    <div className="card-body p-0">
                                        <img src={products.better_featured_image.source_url} className="card-img-top" alt={products.better_featured_image.alt_text} />
                                        <p className="card-text my-1 p-2 text-justify pro_desc">{products.acf.description}</p>
                                        <div className='card-footer p-2'>
                                            <p className='font-weight-bold text-secondary'>Price : $ {products.acf.price} </p>
                                            <div className=''>
                                                <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white' href={products.acf.aliexpress_link} target='blank'>Amazone</a>
                                                <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white ml-3' href={products.acf.amazon_link} target='blank'>Ali Express</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }


            {posts.length < 1 && <div className='col-4 offset-md-4'><LoadingEffect /></div>}
            </div>
        </div>
    )
}

export default Home;