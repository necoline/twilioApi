var Post =  require('../models/post');

/**
 * List Posts
 */
exports.list = (req, h) => {
  return Post.find({}).exec().then((post) => {

    return { posts: post };

  }).catch((err) => {

    return { err: err };

  });
}

/**
 * Get Post by ID
 */
exports.get = (req, h) => {

  return Post.findById(req.params.id).exec().then((post) => {

    if(!post) return { message: 'post not Found' };

    return { post: post };

  }).catch((err) => {

    return { err: err };

  });
}


/**
 * POST a Post
 */
exports.create = (req, h) => {

  const postData = {
    post.question = req.payload.question;
    post.voteCount = req.payload.voteCount;
  };

  return Post.create(postData).then((Post) => {

     return { message: "Post created successfully", post: post };

  }).catch((err) => {

    return { err: err };

  });
}

/**
 * PUT | Update Post by ID
 */
exports.update = (req, h) => {

  return Post.findById(req.params.id).exec().then((post) => {

    if (!post) return { err: 'Post not found' };

    post.question = req.payload.question;
    post.voteCount = req.payload.voteCount;

    post.save(postData);

  }).then((data) => {

      return { message: "Post data updated successfully" };

  }).catch((err) => {

      return { err: err };

  });
}

/**
 * Delete Post by ID
 */
exports.remove = (req, h) => {

  return Post.findById(req.params.id).exec(function (err, post) {

    if (err) return { dberror: err };
    if (!post) return { message: 'Post not found' };

    post.remove(function (err) {
      if (err) return { dberror: err };

      return { success: true };
    });
  });
}