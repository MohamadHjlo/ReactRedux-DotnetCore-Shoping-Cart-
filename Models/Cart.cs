namespace SpaReduxDotNet.Models
{
    public class Cart
    {
        public int Id { get; set; }


        public decimal Subtotal { get; set; }


        public ICollection<ProductToCart> ProductToCarts { get; set; }

    }
}
