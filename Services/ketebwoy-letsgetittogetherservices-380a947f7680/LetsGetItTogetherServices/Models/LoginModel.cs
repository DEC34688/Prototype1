using System;
using System.ComponentModel.DataAnnotations;

namespace LetsGetItTogetherServices.Models
{
    public class LoginModel
    {
        public int Id { get; set; }

        [Required]
        public String Username { get; set; }

        [Required]
        public String Password { get; set; }
    }
}
