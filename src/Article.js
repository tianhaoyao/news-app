function Article(props) {

  
  
  return (
    <div className="Article">
      <a href={props.url}>
        <h3>{props.title}</h3>
      </a>
      <h4 onClick={() => {props.sourceClick(props.sourceid)}}>{props.source}</h4>
      <p>{props.content}</p>
    </div>
  );
}

export default Article;
