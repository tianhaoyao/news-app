import './App.css';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {populate, del} from './actions';
import Article from './Article';

function App() {

  const API = process.env.REACT_APP_API;
  const dispatch = useDispatch();
  const newsData = useSelector((state) => state.news);
  const [search, setSearch] = useState("apple");
  const [page, setPage] = useState(0);
  const [display, setDisplay] = useState([]);

 
  const reset = async() => {
    dispatch(del());
    setPage(0);
    setDisplay([]);
    init();
    
  }
  useEffect(() => {
    reset();
    
    
  }, [search])


  const init = async() => {
    if(search !== "") {
      dispatch(del());
      try {
        const res = await fetch(`https://newsapi.org/v2/everything?q=${search}&from=2021-04-25&to=2021-04-25&sortBy=popularity&apiKey=${API}`);
        const data = await res.json();
        let collection = []
        for(let i = 0; i < data["articles"].length; i++) {
          let article = data["articles"][i]
          dispatch(populate(article));
          collection.push(article)
        }
        
        setDisplay(collection.slice(0,10));
        }
        catch(err) {
          console.log(err)
        }
      }
      
      
    
  
  }

  const switchPage = (direction) => {
    if(direction === "next") {
      setPage(page+1);
    }
    else {
      if(page > 0) {
        setPage(page-1);
      }
      else{
        return
      }
      
    }
    
    let begin = page * 10
    let end = (page+1) * 10
    setDisplay(newsData.slice(begin, end))
    console.log(newsData)
    console.log(page)
  }

  const handleChange = (event) => {
    setSearch(event.target.value);
    console.log(search)
  };

  return (
    <div className="App">

      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />

      {display !== undefined ? (
        display.map(function (article, i) {
          return (
            <div>
              <Article 
                title={article.title} 
                content={article.content}
                url={article.url}
                 />
              
            </div>
          );
        })
      ) : (
        <br />
      )}
      <button onClick={() => {switchPage("prev")}}>prev page</button>
      <p>page: {page}</p>
      <button onClick={() => {switchPage("next")}}>next page</button>
      
    </div>
  );
}

export default App;
