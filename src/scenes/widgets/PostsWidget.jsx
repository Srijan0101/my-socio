import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("https://mysocio.onrender.com/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data)
    dispatch(setPosts({ posts: data }));

    
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://mysocio.onrender.com/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    // console.log(data)
    // dispatch(setPosts({ posts: data }));
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(posts)
  return (
    <>
      {posts.map(
        (ele) => (
          <PostWidget
            key={ele._id}
            postId={ele._id}
            postUserId={ele.userId}
            name={`${ele.firstName} ${ele.lastName}`}
            description={ele.description}
            location={ele.location}
            picturePath={ele.picturePath}
            userPicturePath={ele.userPicturePath}
            likes={ele.likes}
            comments={ele.comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;