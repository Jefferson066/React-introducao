import { useEffect, useState, useCallback } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts'
import { loadPosts } from '../../utils/load-posts' 
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () =>{
 
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(6);
  const [searchValue, setSearchValue] = useState('');
  
  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ? 
  allPosts.filter(post =>  post.title.toLowerCase().includes(searchValue.toLowerCase())) 
  : posts;

  
  const handleLoadPosts = useCallback (async (page, postsPerPage) => {
    
    const postsPhotos = await  loadPosts();
    setPosts(postsPhotos.slice(page, postsPerPage));
    setAllPosts(postsPhotos)
  }, []);
  
  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  },[handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  }

 const handleChange = e =>{
    const { value } = e.target;
    setSearchValue(value);
  }
  
  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
        )}

        <TextInput searchValue = {searchValue} handleChange = {handleChange}/>
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
            onClick = { loadMorePosts }
            disabled = { noMorePosts }
          />
        )}
      </div>
    </section>
  )
};

/*
export class Home2 extends Component {
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
*/

