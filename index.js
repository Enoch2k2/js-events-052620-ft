const title = () => document.getElementById("title");
const form = () => document.querySelector('form');
const blogTitle = () => document.querySelector('input#blog-title')
const blogContent = () => document.querySelector('textarea#blog-content')
const blogList = () => document.getElementById('blog-list')
const submitButton = () => document.getElementById('submit-blog')


const baseUrl = 'http://localhost:3000'

let editing = false;


document.addEventListener("DOMContentLoaded", callOnLoad)


function callOnLoad() {
  // getBlogs();
  loadBlogs();
  title().addEventListener('click', changeToBlue)
  form().addEventListener('submit', Blog.createFromForm)
}

function changeToBlue() {
  // change title to blue
  // we will need the title
  // we will need to change it's style color to blue
  title().style.color = "blue";
}

function loadBlogs() {
  // fetch to get our blog data http://localhost:3000/blogs index of blog data
  // when data comes back we will need to display to page


  fetch(baseUrl + '/blogs')
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }
      return resp.json()
    })
    .then(data => {
      Blog.createBlogs(data)
      Blog.displayBlogs();
    })
    .catch(errors => console.log(errors))
}

// async function getBlogs() {
//   const promise = await fetch(baseUrl + '/blogs');
//   const blogs = await promise.json();
//   displayBlogs(blogs)
// }








function resetInputs() {
  blogTitle().value = "";
  blogContent().value = "";
}

/*
  Q1: What is the overall process?
    - we want to click the delete button in order to delete the blog
  Q2: What is the cause of this?
    - click
  Q3: At what point of time should the cause happen?
    - when the delete button exist
*/