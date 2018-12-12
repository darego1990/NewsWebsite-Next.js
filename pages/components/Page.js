//Craig Hogan x00075734
import React, { Component } from 'react';

// imports
import Meta from './Meta';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

class Page extends Component 
{
    render() 
    {
        return (
            <div class="flex items-center justify-between">
                <Meta />
                <Header />
                <Nav />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default Page;

