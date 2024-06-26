const ERRORS = {
  TOKEN_EXPIRED: 'Token expired',
  BAD_TOKEN: 'Bad token',

  USER_NOT_FOUND: 'User not found',
  USER_REQUIRED_FIELDS: 'Email, username, and password are required',
  DUPLICATE_EMAIL: 'An account with this email already exists',
  DUPLICATE_USERNAME: 'An account with this username already exists',
  DUPLICATE_GROUP_NAME: 'A group with this groupName already exists',

  POST_ID_MISSING: 'Post ID is missing',
  POST_NOT_FOUND: 'Post not found',
  GROUP_NOT_FOUND: 'Group not found',
  COMMENT_NOT_FOUND: 'Comment not found',
  DUPLICATE_URL: 'A post with this URL already exists',

  COMMENT_MISSING: 'Comment is missing',
  COMMENT_ID_MISSING: 'Comment ID is missing',

  DUPLICATE_LIKE: 'Duplicate like',
  PASSWORD_INCORRECT: 'Password incorrect'
};

module.exports = ERRORS;