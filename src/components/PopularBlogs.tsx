import { MessageCircle, ThumbsUp } from "lucide-react"


const PopularBlogs = () => {
  const blogs =[
    {
      title: "My Amazing Blog Title 1",
      author: "Jordan",
      likes: 142,
      comments: 44,
    },
    {
      title: "My Amazing Blog Title 2",
      author: "John",
      likes: 153,
      comments: 25,
    },
    {
      title: "My Amazing Blog Title 3",
      author: "Huxn",
      likes: 50,
      comments: 44,
    },
  
  ]
  return (
    <div className="bg-white p-5 w-[23rem] mt-4 border ml-5 rounded">
      <h2 className="mb-5 text-xl font-bold">Popular Blogs</h2> 
       <ul>
        {blogs.map((blog,index) =>(
          <li key={index} className="mb-4">
            <div className="flex items-center justify-between">
              <span className="mb-2 font-bold">{blog.title}</span>
            </div>
            <span className="text-gray-600">Publish by {blog.author}</span>
            <div className="flex items-center mt-2">
              <MessageCircle size={16} />
              <span className="ml-1 mr-5 text-gray-500">{blog.likes}</span>

              <ThumbsUp size={16} />
              <span className="ml-2 mr-2 text-gray-500 ">
                {blog.comments}
              </span>
            </div>
          </li>
        ))}
       </ul>
    </div>
  )
}

export default PopularBlogs
