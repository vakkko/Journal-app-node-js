function delePost(posts, postId) {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === postId) {
      posts.splice(i, 1);
      break;
    }
  }
}

export default delePost;
