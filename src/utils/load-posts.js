import axios from 'axios';
export const loadPosts = async() =>{
    const postsResponse = axios.get("https://jsonplaceholder.typicode.com/posts");
    const photosResponse = axios.get("https://jsonplaceholder.typicode.com/photos");

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);
    const postsData = posts.data;
    console.log(photos.url)
    const photosData = photos.data;
    

    const postsPhotos = postsData.map((post, index) => {
      return {...post, cover: photosData[index].url }
    });
    return postsPhotos
}