module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      charset: 'utf8mb4', // 이모티콘 데이터에 추가시 utf8mb4 사용
      collate: 'utf8mb4_general_ci'
    }
  );
  Post.associate = (db) => {};
  return Post;
};
