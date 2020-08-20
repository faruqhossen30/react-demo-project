import React, { Component } from 'react';
import Axios from 'axios'
class Header extends Component {
    state = {
        banner: []
    }
    componentDidMount() {
        const addsURL = 'https://kidsrctoys.com/admin/wp-json/wp/v2/adds_header'
        Axios.get(addsURL)
            .then((res) => {
                this.setState({
                    banner: res.data
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        const { banner } = this.state
        return (
            <>
                <div className='container my-2'>
                    {
                        banner.map(banner => {
                            return (
                                <div key={banner.id} className='banner_photo'>
                                    <a href=""><img src={banner.acf.banner_image.url} alt={banner.acf.banner_image.alt} /></a>
                                </div>
                            )
                        })
                    }
                </div>

            </>
        );
    }
}

export default Header;