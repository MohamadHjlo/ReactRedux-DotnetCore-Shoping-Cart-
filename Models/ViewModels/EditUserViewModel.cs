using System.ComponentModel.DataAnnotations;

namespace SpaReactDotNet.Models.ViewModels
{
    public class EditUserViewModel
    {

        public int Id { get; set; }

        [Required]
        [MaxLength(500, ErrorMessage = "نام کاربر باید حداکثر دارای 500 کاراکتر باشد")]
        [MinLength(10, ErrorMessage = "نام کاربر باید حداقل دارای ده کاراکتر باشد")]
        public string Name { get; set; }

        [Required]
        [MaxLength(500, ErrorMessage = "نام خانوادگی کاربر باید حداکثر دارای 500 کاراکتر باشد")]
        [MinLength(10, ErrorMessage = "نام خانوادگی کاربر باید حداقل دارای ده کاراکتر باشد")]
        public string Family { get; set; }

        [Required]
        [MaxLength(500, ErrorMessage = "توضیحات کاربر باید حداکثر دارای 500 کاراکتر باشد")]
        [MinLength(100, ErrorMessage = "توضیحات کاربر باید حداقل دارای 100 کاراکتر باشد")]
        public string Describtion { get; set; }
    }
}
