class Blog {
  static all = [];
  static editedBlogId = null;

  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
  }

  display() {
    const div = document.createElement('div');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');

    deleteButton.classList.add('btn');
    deleteButton.innerText = 'delete'
    deleteButton.id = this.id;
    deleteButton.addEventListener('click', Blog.deleteBlog) // delete /blogs/1

    editButton.classList.add('btn');
    editButton.innerText = 'edit'
    editButton.id = this.id;

    editButton.addEventListener('click', Blog.editBlog) // delete /blogs/1

    h4.innerText = this.title;
    p.innerText = this.content

    div.appendChild(h4);
    div.appendChild(p);
    div.appendChild(editButton)
    div.appendChild(deleteButton)

    blogList().appendChild(div);
  }

  static createBlogs(blogsData) {
    blogsData.forEach(data => Blog.create(data.id, data.title, data.content));
  }

  static create(id, title, content) {
    let blog = new Blog(id, title, content);

    Blog.all.push(blog);

    return blog;
  }

  static editBlog(e) {
    editing = true;

    // populate form inputs
    blogTitle().value = this.parentNode.querySelector('h4').innerText
    blogContent().value = this.parentNode.querySelector('p').innerText;
    submitButton().value = "Edit Blog"

    Blog.editedBlogId = this.id;
    // debugger;
  }

  static createFromForm(e) {
    e.preventDefault();

    // params.require(:blog).permit(:title, :content)
    if (editing) {
      Blog.updateBlog();
    } else {
      const strongParams = {
        blog: {
          title: blogTitle().value,
          content: blogContent().value
        }
      }

      fetch(baseUrl + '/blogs.json', {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
      })
        .then(resp => resp.json())
        .then(data => {
          let blog = Blog.create(data.id, data.title, data.content);
          blog.display();
        })

      // POST /blogs

      resetInputs();
    }
  }

  static updateBlog(e) {
    let title = document.querySelector('#blog-title').value;
    let content = blogContent().value;

    const strongParams = {
      blog: {
        title: title,
        content: content
      }
    }

    fetch(baseUrl + '/blogs/' + Blog.editedBlogId, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(strongParams)
    })
      .then(resp => resp.json())
      .then(data => {

        let editedBlog = Blog.all.find(blog => blog.id == data.id);
        editedBlog.title = data.title;
        editedBlog.content = data.content
        Blog.displayBlogs();

        resetInputs();
        editing = false;
        Blog.editedBlogId = null;
        submitButton().value = "Create Blog";
      })
  }

  static deleteBlog(e) {
    this.id // id of blog
    this.parentNode // div for removing from front end

    fetch(baseUrl + '/blogs/' + this.id, {
      method: "delete"
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        Blog.all = Blog.all.filter(blog => blog.id !== data.id);
        Blog.displayBlogs();
      })
  }

  static displayBlogs() {
    blogList().innerHTML = '';
    Blog.all.forEach(blog => blog.display())
  }
}