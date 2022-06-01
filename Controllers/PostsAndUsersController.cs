using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpaReactDotNet.Data;
using SpaReactDotNet.Models;
using SpaReactDotNet.Models.ViewModels;

namespace SpaReactDotNet.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class PostsAndUsersController : ControllerBase
    {
        private readonly SpaReactDotNetContext _context;

        public PostsAndUsersController(SpaReactDotNetContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }
        [HttpGet("{userId:int}")]
        public async Task<User?> GetUserById(int userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }
        [HttpGet]
        public async Task<List<Post>> GetAllPosts()
        {
            return await _context.Posts.ToListAsync();

        }
        [HttpGet("{postId:int}")]
        public async Task<Post?> GetPostById(int postId)
        {
            return await _context.Posts.FirstOrDefaultAsync(u => u.Id == postId);
        }

        [HttpPost]
        public async Task<bool> CreateUser(EditUserViewModel model)
        {
            if (ModelState.IsValid)
            {
                await _context.Users.AddAsync(new User
                {
                    Name = model.Name,
                    Family = model.Family,
                    Describtion = model.Describtion
                });
                await _context.SaveChangesAsync();
                return Task.CompletedTask.IsCompleted;
            }

            return false;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost(EditPostViewModel model)
        {
            if (ModelState.IsValid)
            {
                await _context.Posts.AddAsync(new Post
                {
                    Title = model.Title,
                    Body = model.Body
                });
                await _context.SaveChangesAsync();
                return Ok(new { message = "Post successFully Craeted!" });

            }
            return Content(string.Join("; ", ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage)));
        }

        [HttpPost]
        public async Task<bool> UpdateUser(EditUserViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == model.Id);

                if (user == null) return false;

                user.Name = model.Name;
                user.Family = model.Family;
                user.Describtion = model.Describtion;

                await _context.SaveChangesAsync();

                return Task.CompletedTask.IsCompleted;
            }

            return false;
        }
        [HttpPost]
        public async Task<IActionResult> UpdatePost(EditPostViewModel model)
        {
            if (ModelState.IsValid)
            {
                var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == model.Id);

                if (post == null) return NotFound(new { message = "Post Not Found", status = 404 });

                post.Title = model.Title;
                post.Body = model.Body;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Post successfuly Updated!" });
            }

            return Content(string.Join("; ", ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage)));
        }
        [HttpPost]
        public async Task<bool> DeleteUser(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return false;

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return true;
        }

        [HttpPost("{postId:int}")]
        public async Task<IActionResult> DeletePost(int postId)
        {
            var post = await _context.Posts.FirstOrDefaultAsync(u => u.Id == postId);

            if (post == null) return NotFound(new { message = "Post Not found", status = 404 });

            _context.Posts.Remove(post);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Post successfuly Updated!" });
        }
    }
}
