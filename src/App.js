import './App.css';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {populate, del} from './actions';
import Article from './Article';

function App() {

  const API = process.env.REACT_APP_API;
  const dispatch = useDispatch();
  const newsData = useSelector((state) => state.news);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const PAGESIZE = 10;

  let indices = []
  for(let i = (page) * 10; i < (page+1) * 10; i++) {
    if(newsData[i]) {
      indices.push(i)
    }
    
  }

 
  const reset = async() => {
    dispatch(del());
    setPage(0);
    init();
    
  }
  useEffect(() => {
    reset();
    
    
  }, [search])

  useEffect(() => {
    init();
  }, [page])


  const init = async() => {
    if(search !== "") {
      let complete = true;
      for(let i = (page) * 10; i < (page+1) * 10; i++) {
        if(!newsData[i]) {
          complete = false;
        }
        
      }
      if(!complete) {

      
      try {
        
        const res = await fetch(`https://newsapi.org/v2/everything?q=${search}&pageSize=${PAGESIZE}&page=${page+1}&sortBy=popularity&apiKey=${API}`);
        const data = await res.json();

        for(let i = 0; i < data["articles"].length; i++) {
          let article = data["articles"][i]
          dispatch(populate(article, page*10+i));
        }

        
        }
        catch(err) {
          console.log(err)
        }
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
  }

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  

  return (
    <div className="App">

      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />

      {newsData !== undefined ? (
        indices.map(function (index) {
          let article = newsData[index];
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
