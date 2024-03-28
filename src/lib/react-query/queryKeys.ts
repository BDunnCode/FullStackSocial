export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = "createUserAccount",

  // USER KEYS
  GET_CURRENT_USER = "getCurrentUser",
  GET_USERS = "getUsers",
  GET_USER_BY_ID = "getUserById",
  GET_TOP_USERS = "getTopUsers",

  // POST KEYS
  GET_POSTS = "getPosts",
  GET_INFINITE_POSTS = "getInfinitePosts",
  GET_INFINITE_SAVED_POSTS = "getInfiniteSavedPosts",
  GET_RECENT_POSTS = "getRecentPosts",
  GET_POST_BY_ID = "getPostById",
  GET_USER_POSTS = "getUserPosts",
  GET_FILE_PREVIEW = "getFilePreview",
  GET_USER_POSTS_BY_USER_ID = "getUserPostsByUserId",
  GET_SAVED_POSTS_BY_USER_ID = "getSavedPostsByUserId",

  //  SEARCH KEYS
  SEARCH_POSTS = "getSearchPosts",
}