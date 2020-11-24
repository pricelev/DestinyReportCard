import React from "react";
import { Modal, ListGroup, Row, Col } from "react-bootstrap";
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
    // FOR LOCAL TESTING
    // this.state = {
    //   followerList: [
    //     { DisplayName: "testchar", emblemIcon: "./steam-icon.png" },
    //     { DisplayName: "testchar", emblemIcon: "./xbox-icon.png" },
    //     { DisplayName: "testchar", emblemIcon: "./ps-icon.png" },
    //     { DisplayName: "testchar", emblemIcon: "./steam-icon.png" },
    //   ],
    //   followingList: [
    //     { DisplayName: "testchar", emblemIcon: "./steam-icon.png" },
    //     { DisplayName: "testchar", emblemIcon: "./steam-icon.png" },
    //   ],
    // };
  }

  componentDidMount() {
    Axios.get(followingAPI, {
      params: {
        membershipID: this.state.memID,
      },
    }).then((response) => {
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
      this.setState({
        followerList: response.data,
        isLoaded: true,
      });
    });
  }

  handleFollowerModal() {
    this.setState({ followerModal: !this.state.followerModal });
  }

  handleFollowingModal() {
    this.setState({ followingModal: !this.state.followingModal });
  }

  generateModalContent(arr) {
    return arr.map((follower, index) => {
      let displayName = follower.DisplayName;
      let emblem = follower.emblemIcon;
      return (
        <a
          href={
            "http://www.destinyreportcard.com/reportcard/" +
            follower.membershipType +
            "/" +
            follower.membershipID
          }
        >
          <ListGroup.Item className="pl-4">
            <Row>
              <Col lg={1} className="p-1">
                <img src={emblem} width="40" alt="Player Emblem" />
              </Col>
              <Col className="mt-2 follower-modal-text">{displayName}</Col>
            </Row>
          </ListGroup.Item>
        </a>
      );
    });
  }

  render() {
    let followerData;
    let followingData;

    if (this.state.followerList.length === 0) {
      followerData = <div className="m-3">This user has no followers.</div>;
    } else {
      followerData = this.generateModalContent(this.state.followerList);
    }

    if (this.state.followingList.length === 0) {
      followingData = (
        <div className="m-3">This user is not following anyone.</div>
      );
    } else {
      followingData = this.generateModalContent(this.state.followingList);
    }

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
          <Modal.Body className="p-0">
            <ListGroup variant="flush">{followerData}</ListGroup>
          </Modal.Body>
        </Modal>

        {/*
          FOLLOWING MODAL
        */}

        <Modal show={this.state.followingModal}>
          <Modal.Header closeButton onClick={() => this.handleFollowingModal()}>
            <Modal.Title>Following</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0">
            <ListGroup variant="flush">{followingData}</ListGroup>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default FollowerPanel;
