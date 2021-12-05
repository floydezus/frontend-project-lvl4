import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('user'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {

  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [fetchingStatus, setFetchingStatus] = useState('idle');

  useEffect(() => {
    setFetchingStatus('loading');
    axios.get(routes.dataPath(), {
      headers: getAuthHeader(),
    })
      .then((response) => {
        const { data } = response;
        setContent(data);
        setFetchingStatus('loaded');
      })
      .catch((error) => {
        setError(error);
        setFetchingStatus('failed');
      });
  }, []);

  const renderChannelList = ({ channels }) => {
    // console.log('renderChannelList');
    // console.log(channels);
    return channels.map((channel) => <li key={channel.id} className="nav-item w-100"><Button className="btn-light w-100 rounded-0 text-start btn"><span className="me-1">#</span>{channel.name}</Button></li>);
  };

  const renderHeader = ({channels, messages, currentChannelId}) => {
    const currentChannel = channels.find(({id}) => id === currentChannelId);
    return (
      <div>
        <p>
          {`#${currentChannel.name}`}
        </p>
        <span className="text-muted">
          {`0 message`}
        </span>
      </div>
    )
  }

  const renderMessages = ({messages, currentChannelId}) => {

  };

  console.log(content);

  if (fetchingStatus === 'idle' || fetchingStatus === 'loading') {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (fetchingStatus === 'failed') {
    const errorMessage = error?.message || "Can't load data!";
    return <div className="bg-warning">Error | {errorMessage}</div>;
  }

  if (fetchingStatus === 'loaded') {
    return (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100" variant="dark">
          <Col className="col-4 col-md-2 border-end pt-5 px-0">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
              <span>Каналы</span>
              <Button className="p-0 btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <span className="visually-hidden">
                  +
                </span>
              </Button>
            </div>
            {content?.channels  &&
            <ul className="nav flex-column nav-pills nav-fill px-2">
              {renderChannelList(content)}
            </ul>}
          </Col>
          <Col className="h-100">
            <div className="d-flex flex-column h-100">
              {renderHeader(content)}
              <div className="mt-auto px-5 py-3">
                <Form>
                  <Form.Group>
                    <Form.Control placeholder="Type message"/>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ChatPage;
