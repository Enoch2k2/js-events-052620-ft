const title = () => document.getElementById("title");
const form = () => document.querySelector('form');
const blogTitle = () => document.querySelector('input#blog-title')
const blogContent = () => document.querySelector('textarea#blog-content')
const blogList = () => document.getElementById('blog-list')

const baseUrl = 'http://localhost:3000'

document.addEventListener("DOMContentLoaded", callOnLoad)


function callOnLoad() {
  loadBlogs();
  title().addEventListener('click', changeToBlue)
  form().addEventListener('submit', createBlog)
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

  console.log('a');

  fetch(baseUrl + '/blogs')
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }
      console.log('b')
      return resp.json()
    })
    // .then(data => console.log('c', data))
    // .catch(errors => console.log('d', errors))
    .then(data => displayBlogs(data))

  console.log('e')

  // 
}

function createBlog(e) {
  e.preventDefault();

  // params.require(:blog).permit(:title, :content)

  const strongParams = {
    blog: {
      title: blogTitle().value,
      content: blogContent().value
    }
  }

  // "\{'blog': \{ \}\}"

  fetch(baseUrl + '/blogs', {
    method: "delete",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(strongParams)
  })
    .then(resp => resp.json())
    .then(blog => {
      displayBlog(blog);
    })

  // POST /blogs

  resetInputs();
}

function displayBlogs(blogs) {
  blogs.forEach(blog => displayBlog(blog))
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

/*
  Q1: What is the overall process?
    - Refresh the page, it populates our blogs
  Q2: What is the cause of this?
    - When the DOM loads (DOMContentLoaded)
  Q3: At what point of time should the cause happen?
    - When the DOM loads (DOMContentLoaded)
*/