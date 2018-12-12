//Craig Hogan x00075734

//imports
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import SearchForm from './components/SearchForm';

const apiKey = '346aecffc706441ca7e7793c0b26ea35';

const defaultNewsSource = 'entertainment-weekly';

// fetches and returns data from given URL
async function getNews(url) 
{
  try //try fetch
  {
    const res = await fetch(url);
    const data = await res.json(); // get JSON data
    return (data); // return JSON data
  } catch (error) 
  {
    return (error); //return error
  }
}

//define class
export default class News extends React.Component 
{
    //constructor
  constructor(props) 
  {
    super(props)
    this.state = {
      newsSource: "",
      url: "",
      articles: []
    }
  }
  // this is passed to the searchForm component and gets the value entered
  setNewsSource = (input) => {
    this.setState({
      newsSource: input,
      url: `https://newsapi.org/v2/top-headlines?sources=${input}&apiKey=${apiKey}`
    })
  }

  //gets article endpoints 
  searchNewsAPI = (event) => 
  {
      //sets the values of state which updates; componentDidUpdate
    this.setState(
    {
      newsSource: `${event.target.innerText}`,
      url: `https://newsapi.org/v2/${event.target.name}&apiKey=${apiKey}`
    })
    console.log(this.state.url);
  }


  //genereates the page
  render() 
  {
      //if state is empty, copy articles to it
    if (this.state.articles.length == 0) 
    {
      this.state.articles = this.props.articles;
    }
    return (
      <div>

        <SearchForm setNewsSource={this.setNewsSource} />

        {/*// links for user*/}
        <ul className="newsMenu">
         <li><a href="#" onClick={this.searchNewsAPI} name="everything?q=entertainment-weekly">Entertainment Weekly</a></li>
         <li><a href="#" onClick={this.searchNewsAPI} name="everything?q=mtv-news">MTV News</a></li>
         <li><a href="#" onClick={this.searchNewsAPI} name="everything?q=reddit-r-all">Reddit</a></li>
         <li><a href="#" onClick={this.searchNewsAPI} name="everything?q=the-lad-bible">The Lad Bible</a></li>
        </ul>

        {/*display title*/}
        <h3>{this.state.newsSource.split("-").join(" ")}</h3>
        <div>
          { /*go through articles and display data for each story*/}
          {this.state.articles.map((article, index) => (
            <section key={index}>
              <h3>{article.title}</h3>
              <p className="author">{article.author} {this.formatDate(article.publishedAt)}</p>
              <img src={article.urlToImage} alt="article image" className="img-article"></img>
              <p>{article.description}</p>
              <p>{article.content}</p>
              <p><Link href={article.url}><a>Source</a></Link></p>
            </section>
          ))}
        </div>

        <style jsx>{`
              section {
                width: 90%;
                border: 2px solid grey;
                background-color: rgb(204, 255, 204);
                padding: 2em;
                margin: 2em;
              }
            .author {
                font-style: italic;
                font-size: 0.8em;
              }
            .img-article {
                max-width: 50%;
              }
            .newsMenu {
              display: flex;
              flex-direction: row;
              margin: 0;
              padding: 0;
              margin-top: 20px;
            }
            .newsMenu li {
              display: inline-table;
              padding-left: 20px;
            }
            .newsMenu li a {
              font-size: 1em;
              color: blue;
              display: block;
              text-decoration: none;
            }
            .newsMenu li a:hover {
              color: rgb(255, 187, 0);
              text-decoration: underline;
            }
          `}</style>
      </div>
    );
  }

  
  //gets initial date from server using ajax call which props are then used 
  // by constructor for news page 
  static async getInitialProps(response) 
  {
      //build url
    const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;
    const data = await getNews(defaultUrl);

    //if article array is returned then return articles
    if (Array.isArray(data.articles)) 
    {
      return {
        articles: data.articles
      }
    }
    // else contains error
    else {
      console.error(data)
      if (response) {
        response.statusCode = 400
        response.end(data.message);
      }
    }
  }

  //called when page props/state are updated
  async componentDidUpdate(prevProps, prevState) 
  {
    //check if url has changed
    if (this.state.url !== prevState.url) {

     //fetch data and call getNews() function
      const data = await getNews(this.state.url);
      
      //if article array is returned then stores articles in state
      if (Array.isArray(data.articles)) {
        this.state.articles = data.articles;
        this.setState(this.state);//update page
      }
      //else contains error
      else {
        console.error(data)
        if (response) {
          response.statusCode = 400
          response.end(data.message);
        }
      }
    }
  }

  //change format of date
  formatDate(input) 
  {
    const date = new Date(input);
    const monthNames = 
    [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    const hour = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${monthNames[monthIndex]} ${year} ${hour}:${minutes}`;
  } 
}