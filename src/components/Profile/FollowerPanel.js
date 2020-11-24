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
            <b>{this.state.followerList.length}</b> Followers
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="link-btn"
            onClick={() => this.handleFollowingModal()}
          >
            <b>{this.state.followingList.length}</b> Following
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
             {this.state.followerList.map((follower, index) => {
                  let displayName = follower.DisplayName;
                  return(
                    <ListGroup variant="flush">
                      <a href={
                            "http://www.destinyreportcard.com/reportcard/" +
                            follower.membershipType +
                            "/" +
                            follower.membershipID
                          }>
                        <ListGroup.Item>{displayName}</ListGroup.Item>
                      </a>
                    </ListGroup>
                  )
                })
              }
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
          {this.state.followingList.map((following, index) => {
                  let displayName = following.DisplayName;
                  return(
                    <ListGroup variant="flush">
                      <a href={
                            "http://www.destinyreportcard.com/reportcard/" +
                            following.membershipType +
                            "/" +
                            following.membershipID
                          }>
                        <ListGroup.Item>{displayName}</ListGroup.Item>
                      </a>
                    </ListGroup>
                  )
                })
              }
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default FollowerPanel;
