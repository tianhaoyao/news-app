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
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(0);
  const PAGESIZE = 10;

  let indices = []
  for(let i = (page) * 10; i < (page+1) * 10; i++) {
    if(newsData[i]) {
      indices.push(i)
    }
    
  }

 
  const reset = async() => {
    console.log("reset")
    dispatch(del()).then(()=>{
      console.log("got here")
      init();
    });
    setPage(0);
    
    
  }
  useEffect(() => {
    reset();
    
    
  }, [search, source])

  useEffect(() => {
    init();
  }, [page])



  const init = async() => {
    // console.log("initing")
    // console.log(search)
    // console.log(source)
    if(search !== "") {
      let complete = true;
      console.log("here")
      for(let i = (page) * 10; i < (page+1) * 10; i++) {
        if(!newsData[i]) {
          complete = false;
        }
        
      }
      console.log(complete)
      if(!complete) {

      
      try {
        let req = ""
        if(source) {
          req = `https://newsapi.org/v2/everything?q=${search}&pageSize=${PAGESIZE}&sources=${source}&page=${page+1}&sortBy=popularity&apiKey=${API}`
        }
        else {
          req = `https://newsapi.org/v2/everything?q=${search}&pageSize=${PAGESIZE}&page=${page+1}&sortBy=popularity&apiKey=${API}`
        }
        
        const res = await fetch(req);
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
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    setSearch(query);
    event.preventDefault();
  }

  function sourceClick(id) {
    if(id === null) return;
    setSource(id);
    dispatch(del())
  }


  

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>

      {source !== "" ? 
        <p>source: {source}</p>
      :
        <p>no source selected</p>
      }

      {newsData !== undefined ? (
        indices.map(function (index) {
          let article = newsData[index];
          return (
            <div>
              <Article 
                title={article.title} 
                content={article.content}
                url={article.url}
                source={article.source.name}
                sourceid={article.source.id}
                sourceClick={sourceClick}
                 />
              
            </div>
          );
        })
      ) : (
        <br />
      )}
      <div>
        <button onClick={() => {switchPage("prev")}}>prev page</button>
        <p>page: {page}</p>
        <button onClick={() => {switchPage("next")}}>next page</button>
        <button onClick={() => {sourceClick("")}}>reset source</button>
      </div>
      
    </div>
  );
}

export default App;
