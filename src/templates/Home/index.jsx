import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts'
import { loadPosts } from '../../utils/load-posts' 
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 6,
    searchValue: ''
  }

  async componentDidMount() {
    const { page, postsPerPage } = this.state;
    const postsPhotos = await  loadPosts();
    this.setState({
      posts: postsPhotos.slice(page, postsPerPage),
      allPosts: postsPhotos});
  }

  loadMorePosts = () => {
    const {
      posts,
      allPosts,
      page,
      postsPerPage
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({posts, page: nextPage})
  }

  handleChange = e =>{
    const { value } = e.target;
    this.setState({searchValue: value});
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
      allPosts.filter(post =>  post.title.toLowerCase().includes(searchValue.toLowerCase())) 
    : posts;


    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
              <h1>Search value: {searchValue}</h1>
          )}

          <TextInput searchValue = {searchValue} handleChange = {this.handleChange}/>
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts = { filteredPosts } />
        )}

        {filteredPosts.length === 0 &&(
          <p>Não existem posts</p>
        )}

        <div className = "button-container">
          {!searchValue && (
            <Button text = "Load more Posts"
              onClick = { this.loadMorePosts }
              disabled = { noMorePosts }
            />
          )}
        </div>
      </section>
    )
  }
}


