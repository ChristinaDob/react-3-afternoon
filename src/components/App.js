import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post';

import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios
      .get(`https://practiceapi.devmountain.com/api/posts`)
      .then(res => {
        toast.success(`Success`);
        this.setState({
          posts: res.data
        });
      })
      .catch(() => toast.error(`Error`));
  }

  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then(res => {
        toast.success(`Success`);
        this.setState({
          posts: res.data
        });
      })
      .catch(() => toast.error(`Error`));
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(res => {
        toast.success(`Success`);
        this.setState({
          posts: res.data
        });
      })
      .catch(() => toast.error(`Error`));
  }

  createPost(text) {
    axios
      .post(`https://practiceapi.devmountain.com/api/posts`, { text })
      .then(res => {
        toast.success(`Success`);
        this.setState({
          posts: res.data
        });
      })
      .catch(() => toast.error(`Error`));
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map(post => (
            <Post
              key={post.id}
              text={post.text}
              date={post.date}
              id={post.id}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
