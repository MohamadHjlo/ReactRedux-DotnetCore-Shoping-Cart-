using System.ComponentModel.DataAnnotations;

namespace SpaReactDotNet.Models.ViewModels
{
    public class EditTodoViewModel
    {

        public int Id { get; set; }

        [Required(ErrorMessage = "وارد کردن عنوان فعالیت الزامی است")]
        [MaxLength(500, ErrorMessage = "عنوان فعالیت باید حداکثر دارای 500 کاراکتر باشد")]
        [MinLength(10,ErrorMessage = "عنوان فعالیت باید حداقل دارای ده کاراکتر باشد")]
        public string Title { get; set; }


        public bool Completed { get; set; }
    }
}
