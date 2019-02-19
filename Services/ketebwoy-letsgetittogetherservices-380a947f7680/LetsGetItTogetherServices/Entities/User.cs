namespace LetsGetItTogetherServices.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string AspNetUserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool Confirmend { get; set; }


    }
}