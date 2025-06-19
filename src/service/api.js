import axios from "axios";
const API_BASE_URL = "https://task1-91x1.onrender.com"; // Replace with your actual API base URL
const api = axios.create({
  baseURL: API_BASE_URL
});
export const getPosts = () => api.get('/posts');
export const getPost = (id) => api.get(`/posts/${id}`);
export const getProfile = (id) => api.get(`/profiles/${id}`);
export const getComments = (postId) => api.get(`/comments?postId=${postId}`);
export const addComment = (comment) => api.post('/comments', comment);

export const searchPosts = async (posts, searchTerm) => {
  if (!searchTerm) return posts;
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};