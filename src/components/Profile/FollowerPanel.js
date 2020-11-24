import React from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import "./FollowerPanel.css";
import Axios from "axios";

const followingAPI = "http://www.destinyreportcard.com:3001/followingList";
const followerAPI = "http://www.destinyreportcard.com:3001/followerList";

class FollowerPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      followerModal: false,
      followingModal: false,
      memID: this.props.memID,
      followerList: [],
      followingList: [],
    };
  }

  componentDidMount() {
    Axios.get(followingAPI, {
      params: {
        membershipID: this.state.memID,
      },
    }).then((response) => {
      console.log(response.data);
      this.setState({
        followingList: response.data,
        isLoaded: true,
      });
    });
    Axios.get(followerAPI, {
      params: {
        membershipID: this.state.memID,
      },
    }).then((response) => {
      console.log(response.data);
      this.setState({
        followerList: response.data,
        isLoaded: true,
      });
    });
    console.log(this.state.followerList);
    console.log(this.state.followingList);
  }

  handleFollowerModal() {
    this.setState({ followerModal: !this.state.followerModal });
  }

  handleFollowingModal() {
    this.setState({ followingModal: !this.state.followingModal });
  }

  render() {
    return (
      <div className="follower-panel-container">
        <span>
          <button
            className="link-btn"
            onClick={() => this.handleFollowerModal()}
          >
            <b>(num)</b> Followers
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="link-btn"
            onClick={() => this.handleFollowingModal()}
          >
            <b>(num)</b> Following
          </button>
        </span>

        {/*
          FOLLOWER MODAL
        */}

        <Modal show={this.state.followerModal}>
          <Modal.Header closeButton onClick={() => this.handleFollowerModal()}>
            <Modal.Title>Followers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>follower 1</ListGroup.Item>
              <ListGroup.Item>follower 2</ListGroup.Item>
              <ListGroup.Item>follower 3</ListGroup.Item>
            </ListGroup>
          </Modal.Body>
        </Modal>

        {/*
          FOLLOWING MODAL
        */}

        <Modal show={this.state.followingModal}>
          <Modal.Header closeButton onClick={() => this.handleFollowingModal()}>
            <Modal.Title>Following</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>following 1</ListGroup.Item>
              <ListGroup.Item>following 2</ListGroup.Item>
              <ListGroup.Item>following 3</ListGroup.Item>
            </ListGroup>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default FollowerPanel;
