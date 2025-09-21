// Blog data interfaces
export const PostData = {
  id: String,
  slug: String,
  title: String,
  excerpt: String,
  coverImage: String,
  author: {
    name: String,
    avatar: String,
    bio: String
  },
  tags: [String],
  date: String,
  html: String,
  hero: {
    image: String,
    title: String,
    subtitle: String
  },
  gallery: [String],
  template: String
};

export const Author = {
  name: String,
  avatar: String,
  bio: String
};

export const Hero = {
  image: String,
  title: String,
  subtitle: String
};
