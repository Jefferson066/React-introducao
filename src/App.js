import { Component } from 'react';

import './App.css';

//import { Posts } from './components/Posts';
import { loadPosts } from './utils/load-posts';
import { PostCard } from './components/PostCard';

class App extends Component {
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
       <div className="posts">
          {posts.map(post => (
                <PostCard
                    key={post.id}
                    title={post.title}
                    body = {post.body}
                    id = {post.id}
                    cover={post.cover}
                />
            ))}
        </div>
      </section>
    )
  }
}

export default App;
