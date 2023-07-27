export default posts = [
  {
    id: "1",
    title: "Ліс",
    image: require("./assets/postBackground.png"),
    comments: 0,
    likes: 153,
    location: "Ivano-Frankivs'k Region, Ukraine",
  },
  {
    id: "2",
    title: "Захід на Чорному морі",
    image: require("./assets/post2-image.jpg"),
    comments: 3,
    likes: 200,
    location: "Ukraine",
  },
  {
    id: "3",
    title: "Старий будиночок у Венеції",
    image: require("./assets/post3-image.jpg"),
    comments: 50,
    likes: 200,
    location: "Italy",
  },
];

export function addPost(newPost) {
  console.log("addfunction", newPost);
  posts.push(newPost);
  console.log("posts", posts);
}
