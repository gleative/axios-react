import React from 'react';
import './App.css';
import beerus from './assets/images/beerus.png';
import GetAppIcon from '@material-ui/icons/GetApp';
import ClearIcon from '@material-ui/icons/Clear';

import styled, { keyframes } from 'styled-components';
import axios from 'axios';

import EditPost from './components/EditPost/EditPost';
import HttpStatus from './components/HttpStatus/HttpStatus';

function App() {
  const [posts, setPosts] = React.useState([]);
  const [post, setPost] = React.useState({});
  const [isEditingPost, setIsEditingPost] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState(false);

  const getPosts = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
      console.log('RESPONSE: ', res.data);

      setPosts(res.data);
    });
  };

  const toggleEdit = (postIdx) => {
    setIsEditingPost((postEditBody) => (postEditBody = true));
    setPost(posts[postIdx]);
  };

  const updatePost = (e, title, body) => {
    e.preventDefault();

    post.title = title;
    post.body = body;

    console.log('post title: ', post.title);

    setIsEditingPost(false);
    setLoading(true);
    setTimeout(() => console.log('SIMULATING LONGER LOADING'), 2000);

    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post)
      .then((res) => {
        console.log('UPDATE SUCCESSFUL: ', res.data);
        setIsEditingPost((val) => (val = false));
        setLoading(false);
        setResponse(true);

        // Hide response again
        displayResponse(true);
      })
      .catch((res) => {
        console.log('ERROR: ', res);
        setLoading(false);
        setIsEditingPost(true); // Go back to edit again so can try again or see error
        displayResponse(false);
      });
  };

  const displayResponse = (response) => {
    setTimeout(() => setResponse(!response), 1000);
  };

  function cancelEdit() {
    setIsEditingPost(false);
    setPost({});
  }

  return (
    <div className="App">
      <header className="App-header">
        {response && <HttpStatus requestSuccess={response} />}

        {loading && <SpinningLoadingIcon src={beerus} alt="loading" />}

        {isEditingPost && <EditPost post={post} cancelEdit={cancelEdit} updatePost={updatePost} />}
      </header>
      <main>
        <PostsContainer>
          <PostList>
            {posts.map((post, idx) => (
              <Card key={idx} onClick={() => toggleEdit(idx)}>
                <PostTitle>{post.title}</PostTitle>
                {post.body}
              </Card>
            ))}
          </PostList>
        </PostsContainer>
        <FABContainer>
          <GetPostsFAB onClick={getPosts}>
            <GetAppIcon style={{ color: 'black', fontSize: '2.5em' }} />
          </GetPostsFAB>

          <ClearPostsFAB onClick={() => (posts.length ? setPosts([]) : null)}>
            <ClearIcon style={{ color: 'black', fontSize: '2.5em' }} />
          </ClearPostsFAB>
        </FABContainer>
      </main>
    </div>
  );
}

export default App;

const Card = styled.li`
  border-radius: 5px;
  background: darkslateblue;
  margin: 0.5em auto;
  padding: 2.5em;
  width: 22%;
  color: white;
  height: auto;

  &:hover {
    color: #f0b11f;
    cursor: pointer;
  }
`;

const PostList = styled.ol`
  list-style: none;
  display: flex;
  /* margin: 0 auto; */
  flex-flow: wrap row;
`;

const PostsContainer = styled.div`
  /* background: pink; */
  display: flex;
  justify-content: center;
`;

const PostTitle = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.5em;
  letter-spacing: 2px;
`;

// TODO: Legg den i util mappen
const loadingSpinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }


`;

const SpinningLoadingIcon = styled.img`
  width: 20%;
  animation: ${loadingSpinner} linear infinite 2s;
`;

const FABContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 15%;
  position: fixed;
  bottom: 25px;
  right: 25px;
`;

const GetPostsFAB = styled.button`
  background-color: #f0b11f;
  border-radius: 50%;
  padding: 20px;
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ffd470;
  }
`;

const ClearPostsFAB = styled.button`
  background-color: #f0501f;
  border-radius: 50%;
  padding: 20px;
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ff7a70;
  }
`;
