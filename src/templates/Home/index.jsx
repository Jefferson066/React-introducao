import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts'
import { loadPosts } from '../../utils/load-posts' //'../../utils/load-posts' 

export class Home extends Component {
  state = {
    posts: [
      
    ]
  }

  async componentDidMount() {
    const postsPhotos = await  loadPosts();
    this.setState({posts: postsPhotos});
  }

  render() {
    const { posts } = this.state;
    return (
      <section className="container">
        <Posts posts = { posts } />
      </section>
    )
  }
}


