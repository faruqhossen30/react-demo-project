import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import renderHTML from 'react-render-html';



// const Post = () => {
//     return (
//         <div className='container'>
//             <h1>ok</h1>
//             <h1>{post.title.rendered}</h1>
//             <p>{post.acf.description}</p>
//         </div>
//     )
// }

const SinglePost = ({ postid }) => {
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState({})
    // console.log('check bolean', Boolean(post))

    useEffect(() => {
        const postURL = `https://kidsrctoys.com/admin/wp-json/wp/v2/posts/${postid}`
        {
            postid && 
            Axios.get(postURL)
                .then((res) => {
                    setLoading(true)
                    setPost(res.data)
                    console.log('axios', res.data)

                })
                .catch(err => console.log(err))
        }
    }, [])
    console.log('Single post', post)
    return (
        <>
            <div className='container'>
                <h1>This is page is under development........</h1>
                {/* <h1>{post.slug}</h1> */}
                {/* <img src={post.better_featured_image.source_url} alt=""/> */}
                {/* {post && <h1>{post.title.rendered}</h1>} */}
                {/* <p>{post.acf.description}</p> */}
            </div>
        </>
    )
};

export default SinglePost;