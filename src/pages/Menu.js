import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { Link } from 'react-router-dom'

const Menu = ({ keywordHandaler, catagoryIDHandaler }) => {
    const [menus, setMenus] = useState([])
    const [catagorys, setCatagorys] = useState([])

    useEffect(() => {
        const menuURL = 'https://kidsrctoys.com/admin/wp-json/menus/v1/menus/mainMenu'
        Axios.get(menuURL)
            .then(res => {
                // console.log('menu res', res)
                setMenus(res.data.items)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const catatoryURL = 'https://kidsrctoys.com/admin/wp-json/wp/v2/categories'
        Axios.get(catatoryURL)
            .then((res) => {
                setCatagorys(res.data)
            })
            .catch(err => console.log(err))

    }, [])

    return (
        <div className="container-fluid bg-dark">
            <div className="container">
                <nav id="navbar_top" className="navbar navbar-expand-lg navbar-dark bg-dark"  >
                    <Link className="navbar-brand" to='/'>Navbar</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {
                                menus.map(menu => {
                                    return (
                                        <li className="nav-item active" key={menu.ID}>
                                            <Link onClick={()=> catagoryIDHandaler(menu.object_id)} className="nav-link" to={`/products/${menu.slug}`} >{menu.title}</Link>
                                        </li>
                                    )
                                })
                            }
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    All Cagagory </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {
                                        catagorys.map((catagory) => {
                                            return (
                                                <div key={catagory.id}>
                                                    <Link onClick={()=> catagoryIDHandaler(catagory.id)} className="dropdown-item" to={`/products/${catagory.slug}`} >{catagory.name}</Link>
                                                    <div className="dropdown-divider"></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </li>



                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input onChange={keywordHandaler} className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Menu;