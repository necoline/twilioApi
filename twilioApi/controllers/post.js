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
    name: req.payload.name,
    breed: req.payload.breed,
    age: req.payload.age,
    image: req.payload.image
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

    post.name = req.payload.name;
    post.breed = req.payload.breed;
    post.age = req.payload.age;
    post.image = req.payload.image;

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