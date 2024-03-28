import { useEffect, useState } from 'react';

const useLikedByUser = (blog: any, userId: string | undefined | null) => {
  const [likedByUser, setLikedByUser] = useState(false);
  const [dislikedByUser, setDislikedByUser] = useState(false);

  useEffect(() => {
    if (blog && userId) {
      setLikedByUser(blog?.likes?.includes(userId));
      setDislikedByUser(blog?.dislikes?.includes(userId));
    }
  }, [blog, userId]);

  return { likedByUser, dislikedByUser };
};

export default useLikedByUser;