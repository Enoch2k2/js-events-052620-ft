
document.addEventListener("DOMContentLoaded", callOnLoad)

const title = () => document.getElementById("title");
const form = () => document.querySelector('form');
const blogTitle = () => document.querySelector('input#blog-title')
const blogContent = () => document.querySelector('textarea#blog-content')
const blogList = () => document.getElementById('blog-list')

const blogs = [];

function callOnLoad() {
  title().addEventListener('click', changeToBlue)
  form().addEventListener('submit', createBlog)
}

function changeToBlue() {
  // change title to blue
  // we will need the title
  // we will need to change it's style color to blue
  title().style.color = "blue";
}

function createBlog(e) {
  e.preventDefault();

  const blog = {
    title: blogTitle().value,
    content: blogContent().value
  }

  blogs.push(blog)

  displayBlog(blog);

  resetInputs();
}

function displayBlog(blog) {
  const div = document.createElement('div');
  const h4 = document.createElement('h4');
  const p = document.createElement('p');

  h4.innerText = blog.title;
  p.innerText = blog.content

  div.appendChild(h4);
  div.appendChild(p);

  blogList().appendChild(div);
  /*
    <div>
      <h4>Title</h4>
      <p>All of our content</p>
    </div>
  */
}

function resetInputs() {
  blogTitle().value = "";
  blogContent().value = "";
}