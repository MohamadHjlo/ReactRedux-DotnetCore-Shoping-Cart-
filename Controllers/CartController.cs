using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpaReduxDotNet.Data;
using SpaReduxDotNet.Models;
using SpaReduxDotNet.Models.ViewModels;

namespace SpaReduxDotNet.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class CartController : ControllerBase
    {
        private readonly SpaReduxDotNetContext _context;

        public CartController(SpaReduxDotNetContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>?> Get()
        {
            return (await _context.Carts.Include(c => c.ProductToCarts).ThenInclude(c => c.Product).FirstOrDefaultAsync())?.ProductToCarts.Select(p => p.Product).ToList();
        }
        [HttpGet]
        public async Task<IEnumerable<Product>?> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        [HttpGet]
        public async Task<int> GetCartQuantity()
        {
            return await _context.ProductToCarts.SumAsync(p => p.Quantity);
        }

        [HttpGet("{pageSize:int}")]
        public async Task<List<Todo>> GetByRange(int pageSize)
        {
            return await _context.Todos.Take(pageSize).ToListAsync();

        }
        [HttpGet("{productId:int}")]
        public async Task<Product?> GetProductById(int productId)
        {
            return await _context.Products.FirstOrDefaultAsync(t => t.Id == productId);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(EditProductViewModel model)
        {
            if (ModelState.IsValid)
            {
                var product = new Product
                {
                    Name = model.Name,
                    Describtion = model.Describtion,
                    Price = model.Price,
                    Quantity = model.Quantity,
                };
                await _context.Products.AddAsync(product);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Product successFully Craeted!", createdProduct = product });

            }
            return Content(string.Join("; ", ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage)));
        }
        [HttpPost]
        public async Task<IActionResult> UpdateProduct(EditProductViewModel model)
        {
            if (ModelState.IsValid)
            {
                var product = await _context.Products.FirstOrDefaultAsync(t => t.Id == model.Id);

                if (product == null) return NotFound(new { message = "Todo Not Found", status = 404 });

                product.Name = model.Name;
                product.Describtion = model.Describtion;
                product.Price = model.Price;
                product.Quantity = model.Quantity;


                await _context.SaveChangesAsync();

                return Ok(new { message = "Product successfuly Updated!" });
            }

            return Content(string.Join("; ", ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage)));
        }

        [HttpPost("{productId:int}")]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(t => t.Id == productId);

            if (product == null) return NotFound(new { message = "Todo Not found", status = 404 });

            _context.Products.Remove(product);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Product successfuly Deleted!" });
        }


        [HttpPost]
        public async Task<IActionResult> AddToCart(int id)
        {
            if (!_context.Carts.Any())
            {
                await _context.Carts.AddAsync(new Cart() { Subtotal = 100000000 });
                await _context.SaveChangesAsync();
            }
            var cart = await _context.Carts.FirstOrDefaultAsync();

            var product = await _context.Products.SingleOrDefaultAsync(p => p.Id == id);

            if (cart == null) return NotFound(new { message = "Cart Not found", status = 404 });
            if (product == null) return NotFound(new { message = "Product Not found", status = 404 });


            var cartItem = await _context.ProductToCarts.FirstOrDefaultAsync(p => p.ProductId == id && p.CartId == cart.Id);

            if (cartItem == null)
            {
                await _context.ProductToCarts.AddAsync(new ProductToCart
                {
                    CartId = cart.Id,
                    ProductId = id,
                    Quantity = 1,
                    Price = product.Price
                });
            }
            else
            {
                cartItem.Quantity += 1;
                cartItem.Price += product.Price;
            }


            await _context.SaveChangesAsync();

            return Ok(new { message = "Product successfuly Aded To Cart!", newQty = await _context.ProductToCarts.SumAsync(p => p.Quantity) });
        }

        [HttpPost("{id:int}")]
        public async Task<IActionResult> RemoveItemFromCart(int id)
        {
            var cartItem = await _context.ProductToCarts.FirstOrDefaultAsync(p => p.Id == id);

            if (cartItem == null) return NotFound(new { message = "Item Not found", status = 404 });

            _context.ProductToCarts.Remove(cartItem);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Item successfuly Removed!" });
        }
        [HttpPost("{id:int}")]
        public async Task<IActionResult> ClearCart(int id)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(p => p.Id == id);

            if (cart == null) return NotFound(new { message = "Cart Not found", status = 404 });

            _context.Carts.Remove(cart);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Cart successfuly Cleard!" });
        }

        [HttpPost]
        public async Task<IActionResult> IncDecCartQuantity(int id, bool isAdd)
        {

            var cartItem = await _context.ProductToCarts.Where(p => p.Id == id).Include(c => c.Product).SingleOrDefaultAsync();

            if (cartItem == null) return NotFound(new { isSuccess = false, ErrorMessage = "ایتم پیدا نشد" });

            if (isAdd)
            {
                cartItem.Quantity += 1;
                cartItem.Price += cartItem.Product.Price;
            }
            else if (cartItem.Quantity >= 0)
            {
                cartItem.Quantity -= 1;
                cartItem.Price -= cartItem.Product.Price;
            }

            await _context.SaveChangesAsync();


            return Ok(new
            {
                isSuccess = true,
                newItem = cartItem,
                Quantity = cartItem.Quantity
            });
        }
    }
}
