const title = () => document.getElementById("title");
const form = () => document.querySelector('form');
const blogTitle = () => document.querySelector('input#blog-title')
const blogContent = () => document.querySelector('textarea#blog-content')
const blogList = () => document.getElementById('blog-list')
const submitButton = () => document.getElementById('submit-blog')


const baseUrl = 'http://localhost:3000'

let editing = false;
let editedBlogId = null;

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

  fetch(baseUrl + '/blogs.json')
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }
      return resp.json()
    })
    .catch(errors => console.log(errors))
    .then(data => displayBlogs(data))

  // 
}

function createBlog(e) {
  e.preventDefault();

  // params.require(:blog).permit(:title, :content)
  if (editing) {
    updateBlog();
  } else {
    const strongParams = {
      blog: {
        title: blogTitle().value,
        content: blogContent().value
      }
    }

    // "\{'blog': \{ \}\}"

    fetch(baseUrl + '/blogs.json', {
      method: "post",
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
}

function updateBlog(e) {
  let title = document.querySelector('#blog-title').value;
  let content = blogContent().value;

  const strongParams = {
    blog: {
      title: title,
      content: content
    }
  }

  fetch(baseUrl + '/blogs/' + editedBlogId, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(strongParams)
  })
    .then(resp => resp.json())
    .then(data => {
      const div = document.getElementById(editedBlogId).parentNode

      div.querySelector('h4').innerText = data.title
      div.querySelector('p').innerText = data.content

      resetInputs();
      editing = false;
      editedBlogId = null;
      submitButton().value = "Create Blog";
    })
}

function displayBlogs(blogs) {
  blogs.forEach(blog => displayBlog(blog))
}

function displayBlog(blog) {
  const div = document.createElement('div');
  const h4 = document.createElement('h4');
  const p = document.createElement('p');
  const deleteButton = document.createElement('button');
  const editButton = document.createElement('button');

  deleteButton.classList.add('btn');
  deleteButton.innerText = 'delete'
  deleteButton.id = blog.id;
  deleteButton.addEventListener('click', deleteBlog) // delete /blogs/1

  editButton.classList.add('btn');
  editButton.innerText = 'edit'
  editButton.id = blog.id;

  editButton.addEventListener('click', editBlog) // delete /blogs/1

  h4.innerText = blog.title;
  p.innerText = blog.content

  div.appendChild(h4);
  div.appendChild(p);
  div.appendChild(editButton)
  div.appendChild(deleteButton)

  blogList().appendChild(div);
  /*
    <div>
      <h4>Title</h4>
      <p>All of our content</p>
    </div>
  */
}


function deleteBlog(e) {
  this.id // id of blog
  this.parentNode // div for removing from front end

  fetch(baseUrl + '/blogs/' + this.id, {
    method: "delete"
  })
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      this.parentNode.remove();
    })
}

function editBlog(e) {
  editing = true;

  // populate form inputs
  blogTitle().value = this.parentNode.querySelector('h4').innerText
  blogContent().value = this.parentNode.querySelector('p').innerText;
  submitButton().value = "Edit Blog"

  editedBlogId = this.id;
  // debugger;
}

function resetInputs() {
  blogTitle().value = "";
  blogContent().value = "";
}

/*
  Q1: What is the overall process?
    - click the delete button and it deletes the blog
  Q2: What is the cause of this?
    - clicking the delete button
  Q3: At what point of time should the cause happen?
    -
*/