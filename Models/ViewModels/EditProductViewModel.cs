using System.ComponentModel.DataAnnotations;

namespace SpaReduxDotNet.Models.ViewModels
{
    public class EditProductViewModel
    {

        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Describtion { get; set; }

        [Required]
        public decimal Price { get; set; }


        public int Quantity { get; set; }
    }
}
