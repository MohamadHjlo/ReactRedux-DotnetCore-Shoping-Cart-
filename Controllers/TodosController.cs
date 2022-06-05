using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpaReduxDotNet.Data;
using SpaReduxDotNet.Models;
using SpaReduxDotNet.Models.ViewModels;

namespace SpaReduxDotNet.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class TodosController : ControllerBase
    {
        private readonly SpaReduxDotNetContext _context;

        public TodosController(SpaReduxDotNetContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Todo>> GetAllTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        [HttpGet("{pageSize:int}")]
        public async Task<List<Todo>> GetByRange(int pageSize)
        {
            return await _context.Todos.Take(pageSize).ToListAsync();

        }
        [HttpGet("{todoId:int}")]
        public async Task<Todo?> GetTodoById(int todoId)
        {
            return await _context.Todos.FirstOrDefaultAsync(t => t.Id == todoId);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTodo(EditTodoViewModel model)
        {
            if (ModelState.IsValid)
            {
                var todo = new Todo
                {
                    Title = model.Title,
                    Completed = model.Completed,
                    UserId = 1
                };
                await _context.Todos.AddAsync(todo);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Todo successFully Craeted!", createdTodo = todo });

            }
            return Content(string.Join("; ", ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage)));
        }
        [HttpPost]
        public async Task<IActionResult> UpdateTodo(EditTodoViewModel model)
        {
            if (ModelState.IsValid)
            {
                var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == model.Id);

                if (todo == null) return NotFound(new { message = "Todo Not Found", status = 404 });

                todo.Title = model.Title;
                todo.Completed = model.Completed;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Todo successfuly Updated!" });
            }

            return Content(string.Join("; ", ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage)));
        }
        [HttpPost("{todoId:int}")]
        public async Task<IActionResult> UpdateTodoStatus(int todoId,bool completed)
        {
            var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == todoId);

            if (todo == null) return NotFound(new { message = "Todo Not Found", status = 404 });

            todo.Completed = completed;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Todo Status successfuly Updated!", updatedTodo = todo });

        }
        [HttpPost("{todoId:int}")]
        public async Task<IActionResult> DeleteTodo(int todoId)
        {
            var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == todoId);

            if (todo == null) return NotFound(new { message = "Todo Not found", status = 404 });

            _context.Todos.Remove(todo);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Todo successfuly Deleted!" });
        }
    }
}
