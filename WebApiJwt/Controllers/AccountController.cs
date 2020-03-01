using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebApiJwt.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using System.Security.Claims;
using System.Collections.Generic;

namespace WebApiJwt.Controllers
{

    [ApiController]
    [Route("Account")]
    public class AccountController : ControllerBase
    {

        private readonly IConfiguration _config;

        public AccountController(IConfiguration config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [Route("Logon")]
        public async Task<IActionResult> Logon([FromBody] LoginModel loginModel)
        {
            if (loginModel == null) return Unauthorized();

            var userInfo = await FindUserInDatabase(loginModel);
            if (userInfo == null) 
            {
                return Unauthorized();
            }
            else {
                var tokenString = BuildToken(userInfo);
                return Ok(new { Token = tokenString });
            }
        }

        private async Task<UserInfo> FindUserInDatabase(LoginModel loginModel)
        {
            if (loginModel.UserName == "demoUser" && loginModel.Password == "demoPassword")
            {
                return new UserInfo() {
                    UserName = loginModel.UserName,
                    EmailAddress = "test@test.com",
                    Roles = new String[] { "Regular", "Admin" }
                };
            }
            return null;
        }

        private string BuildToken(UserInfo userInfo)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtToken:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                new Claim(JwtRegisteredClaimNames.Email, userInfo.EmailAddress),
            };

            //AddRoleClaimsToToken(userInfo, claims);

            var token = new JwtSecurityToken(
                issuer: _config["JwtToken:Issuer"],
                audience: _config["JwtToken:Issuer"],
                claims: claims.ToArray(),
                expires: DateTime.Now.AddMinutes(90),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private void AddRoleClaimsToToken(UserInfo userInfo, List<Claim> claims)
        {
            foreach (var role in userInfo.Roles)
            {
                claims.Add(new Claim("role", role));
            }
        }
    }
}
