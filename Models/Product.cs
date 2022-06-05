namespace SpaReduxDotNet.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Describtion { get; set; }

        public string Image { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public ICollection<ProductToCart> ProductToCarts { get; set; }

    }
}
