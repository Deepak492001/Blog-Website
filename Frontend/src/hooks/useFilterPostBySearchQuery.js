const useFilterPostBySearchQuery = ({ searchQuery }) => {
  function filterPostBySearchQuery() {
    let filteredPostsData;
    if (searchQuery.trim() !== "") {
      filteredPostsData = filteredPostsData.filter(
        (post) =>
          post.postTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.postContent.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filteredPostsData;
  }
};
export default useFilterPostBySearchQuery;
