const User = require('./User');
const Blog = require('./Blog');
const BlogComments = require('./BlogComments');

Blog.belongsTo(User);

BlogComments.belongsTo(Blog);

BlogComments.belongsTo(User);

User.hasMany(Blog, {
     foreignKey: 'user_id',
});

BlogComments.hasMany(Blog, {
     foreignKey: 'blog_id',
});

BlogComments.hasMany(User, {
     foreignKey: 'user_id',
});


module.exports = {User, Blog, BlogComments}