import React from 'react';
import styled from 'styled-components';

// Husk, props funksjoner jeg har sendt, REFERER til den i APP js så nå worries å kalle på dem
const EditPost = ({ post, cancelEdit, updatePost }) => {
  const [title, setTitle] = React.useState(post.title);
  const [body, setBody] = React.useState(post.body);

  return (
    <EditCard onSubmit={(e) => updatePost(e, title, body)}>
      <PostTitleEdit placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <PostBodyEdit placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
      <button type="submit">Submit</button>
      <button onClick={cancelEdit}>Cancel</button>
    </EditCard>
  );
};

export default EditPost;

const EditCard = styled.form`
  border-radius: 5px;
  background: darkslateblue;
  margin: 0.5em auto;
  padding: 2.5em;
  width: 90%;
  color: white;

  display: flex;
  flex-flow: nowrap column;
`;

const PostTitleEdit = styled.input`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 0.5em;
  letter-spacing: 2px;
  outline: none;
`;

const PostBodyEdit = styled.textarea`
  height: 20em; ;
`;
