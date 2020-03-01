namespace WebApiJwt.Models
{
    public class UserInfo
    {
        public string UserName { get; set; }
        public string EmailAddress { get; set; }

        public string[] Roles { get; set; }
    }
}