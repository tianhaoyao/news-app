function Article(props) {

  
  
  return (
    <div className="Article">
      <a href={props.url}>
        <h3>{props.title}</h3>
      </a>
      <p>{props.content}</p>
    </div>
  );
}

export default Article;
