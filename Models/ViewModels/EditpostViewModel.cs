using System.ComponentModel.DataAnnotations;

namespace SpaReduxDotNet.Models.ViewModels
{
    public class EditPostViewModel
    {

        public int Id { get; set; }

        [Required(ErrorMessage ="وارد کردن عنوان پست الزامی است")]
        [MaxLength(500, ErrorMessage = "عنوان پست باید حداکثر دارای 500 کاراکتر باشد")]
        [MinLength(10,ErrorMessage = "عنوان پست باید حداقل دارای ده کاراکتر باشد")]
        public string Title { get; set; }


        [Required( ErrorMessage = "وارد کردن متن پست الزامی است")]
        [MinLength(10, ErrorMessage = "متن پست باید حداقل دارای 10 کاراکتر باشد")]
        public string Body { get; set; }
    }
}
