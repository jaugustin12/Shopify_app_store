export class User {
  relationships: {
    followers: any[],
    following: any[]
  };
  role: string;
  fullName: string;
  email: string;
  password: string;
  posts: {
    userPosts: string[];
  };
}
