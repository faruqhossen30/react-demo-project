import React from 'react';
import Axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import { useState, useEffect } from 'react';
import LoadingEffect from '../components/Loading'

const Products = ({ catagoryid, id, catagoryIDHandaler, keyword, getPostID }) => {
    const [loading, setLoading] = useState(false)
    const [catagorys, setCatagorys] = useState([])
    const [posts, setPosts] = useState([])
    // For search product
    const [allproducts, setAllporducts] = useState([])
    const [searchproduct, setSearchproduct] = useState(false)




    useEffect(() => {
        const catatoryURL = 'https://kidsrctoys.com/admin/wp-json/wp/v2/categories'
        Axios.get(catatoryURL)
            .then((res) => {
                setCatagorys(res.data)
            })
            .catch(err => console.log(err))

    }, [])
    useEffect(() => {
        const postsURL = `http://kidsrctoys.com/admin/wp-json/wp/v2/posts?categories=${catagoryid}`
        {
            id &&
                Axios.get(postsURL)
                    .then((posts) => {
                        return setPosts(posts.data)

                        // console.log('Test form catagory posts',posts)
                    })
                    .catch(err => console.log(err))
        }

    }, [catagoryid, id])
    // console.log('check posts', posts)
    // For Search Product
    useEffect(() => {
        const postURL = 'https://kidsrctoys.com/admin/wp-json/wp/v2/posts'
        {
            keyword &&
                Axios.get(postURL)
                    .then(posts => {
                        // setLoading(true)
                        setAllporducts(posts.data)

                        const results = posts.data.filter((product) => {
                            return product.title.rendered.toLowerCase().includes(keyword)
                        })
                        setSearchproduct(true)
                        setAllporducts(results)
                    })
                    .catch(err => console.log(err))
        }
    }, [keyword])
    return (
        <div>
            <div className='container'>
                <div className="row">
                    <div className="col-md-3 border-right">
                        <ul className="list-group list-group-flush hover-color">
                            {
                                catagorys.map((catagory) => {
                                    return (
                                        <li key={catagory.id} className='list-group-item list-group-item-action'>
                                            <Link onClick={() => catagoryIDHandaler(catagory.id)} to={`/products/${catagory.slug}`}  >{catagory.name}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            {
                                keyword.length > 0 &&
                                allproducts.map((post) => {
                                    // console.log('all Post', post)
                                    return (

                                        <div className="col-md-4 p-2" key={post.id}>
                                            <div className="card">
                                                <Link onClick={() => getPostID(post.id)} to={`/${post.slug}`} className='text-decoration-none card-header text-body'><h6 >{post.title.rendered}</h6></Link>
                                                <div className="card-body p-0">
                                                    <img src={post.better_featured_image.source_url} className="card-img-top" alt={post.better_featured_image.alt_text} />
                                                    <p className="card-text my-1 p-2 text-justify pro_desc">{post.acf.description}</p>
                                                    <div className='card-footer p-2'>
                                                        <p className='font-weight-bold text-secondary'>Price : ${post.acf.price} </p>
                                                        <div className=''>
                                                            <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white' href={post.acf.aliexpress_link} target='blank'>Amazone</a>
                                                            <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white ml-3' href={post.acf.amazon_link} target='blank'>Ali Express</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                            {
                                keyword.length == 0 &&
                                posts.map((post) => {
                                    // console.log('all Post', post)
                                    return (

                                        <div className="col-md-4 p-2" key={post.id}>
                                            <div className="card">
                                                <Link onClick={() => getPostID(post.id)} to={`/${post.slug}`} className='text-decoration-none card-header text-body'><h6 >{post.title.rendered}</h6></Link>
                                                <div className="card-body p-0">
                                                    <img src={post.better_featured_image.source_url} className="card-img-top" alt={post.better_featured_image.alt_text} />
                                                    <p className="card-text my-1 p-2 text-justify pro_desc">{post.acf.description}</p>
                                                    <div className='card-footer p-2'>
                                                        <p className='font-weight-bold text-secondary'>Price : ${post.acf.price} </p>
                                                        <div className=''>
                                                            <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white' href={post.acf.aliexpress_link} target='blank'>Amazone</a>
                                                            <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white ml-3' href={post.acf.amazon_link} target='blank'>Ali Express</a>
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
                    
                </div>
            </div>
        </div>
    );
};

export default Products;