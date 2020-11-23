import React, { Component } from "react";
import "./News.css";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";
import Spinner from "react-bootstrap/Spinner";

const token_1 = "&token=44591c1f4de66c503b27329cdb77a0e7";
const token_2 = "&token=f8e02907a2acaf9d63ec7563c51f46a0";

// this is a backup response in case the News API call limit is reached.
// FOR DEMONSTRATION PURPOSES ONLY!
const backup = [
  {
    title:
      "Destiny 2's New Deep Stone Crypt Raid Beaten, Unlocking Quests For All Players",
    description:
      "The Deep Stone Crypt raid for Beyond Light was beaten in about six hours.",
    content:
      "One of the most exciting new additions for Destiny 2: Beyond Light was the new raid, Deep Stone Crypt, which became available for high-level players over the weekend.\nIt took nearly six hours, according to Kotaku, but the raid has been completed for ... [1057 chars]",
    url:
      "https://www.gamespot.com/articles/destiny-2s-new-deep-stone-crypt-raid-beaten-unlocking-quests-for-all-players/1100-6484754/",
    image:
      "https://gamespot1.cbsistatic.com/uploads/original/1179/11799911/3764183-screenshot2020-11-23at9.08.10am.png",
    publishedAt: "2020-11-22T22:08:31Z",
    source: {
      name: "GameSpot",
      url: "https://www.gamespot.com/",
    },
  },
  {
    title:
      "Destiny 2 Team Beats Raid, Unlocks New Beyond Light Quests For All Players",
    description:
      "Destiny 2: Beyond Light’s Deep Stone Crypt raid went live yesterday and after nearly six hours fireteams began to emerge victorious, unlocking a bunch of new content for the entire game in the process.",
    content:
      "Screenshot : Bungie / Kotaku\nDestiny 2: Beyond Light’s Deep Stone Crypt r aid went live yesterday and after nearly six hours fireteams began to emerge victorious, unlocking a bunch of new content for the entire game in the process.\nAdvertisement\nIf y... [3279 chars]",
    url:
      "https://kotaku.com/destiny-2-team-beats-raid-unlocks-new-beyond-light-que-1845734928",
    image:
      "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/zwr0hn4apnbj942oyf4u.png",
    publishedAt: "2020-11-22T15:30:00Z",
    source: {
      name: "Kotaku",
      url: "https://kotaku.com/",
    },
  },
  {
    title:
      "Destiny 2's Deep Stone Crypt raid completed, unlocking new Beyond Light content",
    description:
      "Multiple fireteams have completed Destiny 2's newest raid, the Deep Stone Crypt. As a result, several pieces of new content have been unlocked in the game. Here's what you need to know.",
    content:
      "Multiple fireteams have completed the brand new Destiny 2 raid, the Deep Stone Crypt, which became available to all owners of the Beyond Light expansion earlier today. As a result of this, several new pieces of content have become available to Beyond... [526 chars]",
    url:
      "https://www.windowscentral.com/destiny-2s-deep-stone-crypt-raid-completed-unlocking-new-beyond-light-content",
    image:
      "https://www.windowscentral.com/sites/wpcentral.com/files/styles/large/public/field/image/2020/11/beyond-light-hero-2.jpg",
    publishedAt: "2020-11-22T01:03:17Z",
    source: {
      name: "Windows Central",
      url: "https://www.windowscentral.com/",
    },
  },
];

// USE token_2 IF API LIMIT REACHED
let API = "https://gnews.io/api/v4/search?q=destiny%202&lang=en" + token_2;
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      newsItems: [],
    };
  }

  componentDidMount() {
    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Error loading news API, reverting to backup (probably API limit)"
          );
        }
      })
      .then((data) => {
        if (data.articles) {
          this.setState({
            isLoaded: true,
            newsItems: data.articles,
          });
        }
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          newsItems: backup,
        });
      });
  }

  render() {
    const { isLoaded, newsItems } = this.state;
    if (!isLoaded) {
      return (
        <div className="news-spinner-container">
          <Spinner className="news-spinner" animation="grow" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          <p>Loading News...</p>
          <p className="text-muted">If this does not load, check API limit</p>
        </div>
      );
    }
    if (isLoaded) {
      let items = newsItems
        .filter((i) => {
          return i.title.toLowerCase().includes("destiny");
        })
        .slice(0, 3);

      const NewsItem = (article) => (
        <Card key={article.url} className="news-card">
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
