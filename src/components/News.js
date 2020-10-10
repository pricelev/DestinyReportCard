import React, { Component } from "react";
import "./News.css";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";
import Spinner from "react-bootstrap/Spinner";

let from = new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10);

const token_1 = "&token=44591c1f4de66c503b27329cdb77a0e7";
const token_2 = "&token=f8e02907a2acaf9d63ec7563c51f46a0";
const CORS = "https://cors-anywhere.herokuapp.com/";

// USE SECOND TOKEN IF API LIMIT REACHED
let API = "https://gnews.io/api/v4/search?q=destiny%202&lang=en" + token_1;
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      newsItems: [],
    };
  }

  componentDidMount() {
    fetch(CORS + API)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          isLoaded: true,
          newsItems: data.articles,
        })
      )
      .catch(() => {
        alert("Error loading NEWS, change API token");
      });
  }

  render() {
    const { isLoaded, newsItems } = this.state;
    if (!isLoaded) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else {
      let items = newsItems
        .filter((i) => {
          return i.title.toLowerCase().includes("destiny");
        })
        .slice(0, 3);

      const NewsItem = (article) => (
        <Card key={article.url}>
          <a href={article.url}>
            <Card.Img variant="top" src={article.image} />
          </a>
          <Card.Body>
            <p className="card-text">
              <small className="text-muted">
                {article.publishedAt.slice(0, 10)}
              </small>
            </p>
            <a href={article.url}>
              <Card.Title>{article.title}</Card.Title>
            </a>
            <Card.Text>{article.description}</Card.Text>
            <footer className="blockquote-footer">
              <cite title="Source Author">{article.source.name}</cite>
            </footer>
          </Card.Body>
        </Card>
      );
      console.log(items);
      const results = items.map((e) => NewsItem(e));
      return (
        <div className="news-section">
          <Container>
            <CardDeck>{results}</CardDeck>
          </Container>
        </div>
      );
    }
  }
}

export default News;
