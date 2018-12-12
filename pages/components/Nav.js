//Craig Hogan x00075734
import Link from 'next/link';

const Nav = () => 
(
   <div>
       <nav>
           <ul>
            <li><Link href="/index"><a>Main</a></Link></li>
            <li><Link href="/newspapers"><a>Newspapers</a></Link></li>
            <li><Link href="/sport"><a>Sport</a></Link></li>
            <li><Link href="/entertainment"><a>Entertainment</a></Link></li>
            <li><Link href="/tech"><a>Technology and Science</a></Link></li>
           </ul>
       </nav>
       <style jsx>{`
        nav 
        {
            max-width: 1300px;
            box-shadow: 0 2px 7px 0 rgba(120,137,149,0.25);
            border-radius: 3px;
            test-transform: uppercase;
            padding: 10px;
        }
        nav ul 
        {
            display: flex;
            flex-direction: row;
            margin: 3px;
            padding: 5px;
        }
        nav ul li 
        {
            list-style: none;
            float: left;
            flex-grow: 1;
            text-align: center;
            border-left: 1px solid #fff;
            border-right: 1px solid #ccc;
            width: 16.6667%; /* fallback for non-calc() browsers */
            width: calc(100% / 6);
            box-sizing: border-box;
        }
        nav ul li:first-child 
        {
            border-left: none;
        }
        nav ul li a 
        {
            font-size: 0.8em;
            display: block;
            text-decoration: none;
            color: black;
            padding: 5px 0;
        }
        nav ul li:hover
        {
            background: black;
        }
        nav ul li a:hover
         {
            color: white;
        }
        `}</style>
   </div> 
)

export default Nav;

