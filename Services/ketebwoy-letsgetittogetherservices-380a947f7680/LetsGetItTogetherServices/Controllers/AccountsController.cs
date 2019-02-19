using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using LetsGetItTogetherServices.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using LetsGetItTogetherServices.Models;
using LetsGetItTogetherServices.Entities;
using LetsGetItTogetherServices.Interfaces;
using LetsGetItTogetherServices.Data;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;

namespace LetsGetItTogetherServices.Controllers
{
    [EnableCors("MyPolicy")]
    [Authorize]
    [ApiController]
    [Route("v2")]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;

        private readonly ApplicationDbUserContext _appUserDbContext;
        private readonly LGITContext _LGITDbContext;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;
        private EmailService _emailService;
        private UserService _userService;


        public AccountsController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            //IMapper mapper,
            //ApplicationDbUserContext appDbContext,
            IOptions<AppSettings> appSettings
            )
        {
            this.signInManager = signInManager;
            _LGITDbContext = new LGITContext();
            _appSettings = appSettings.Value;
           this.userManager = userManager; 
            _emailService = new EmailService(_LGITDbContext, appSettings );
            _userService = new UserService(_LGITDbContext, appSettings);
        }

        [EnableCors("MyPolicy")]
        [AllowAnonymous]
        [HttpPost("token")]
        public async Task<IActionResult> CreateToken([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                throw new Exception("Model State is Invalid");
            }

            try
            {
                var loginResult = await signInManager.PasswordSignInAsync(loginModel.Username, loginModel.Password, isPersistent: false, lockoutOnFailure: false);
                if (!loginResult.Succeeded)
                {
                    throw new Exception("Username or password is incorrect");                    
                }

                var user = await userManager.FindByNameAsync(loginModel.Username);

                Token tkn = new Token();
                var tokenString = tkn.GetToken(user.Id.ToString(), _appSettings.Secret);

                return Ok(new
                {
                    Id = user.Id,
                    Username = user.Email,
                    //FirstName = user2.FirstName,
                    //LastName = user2.LastName,
                    TokenString = tokenString
                });
            }
            catch (Exception ex)
            {
                return BadRequest("something went wrong: exception details" + JsonConvert.SerializeObject(ex));
                
            }
         
           
        }

        [EnableCors("MyPolicy")]
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {

            if (ModelState.IsValid)
            {
                var appUser = new ApplicationUser
                {
                    //TODO: Use Automapper instaed of manual binding
                    UserName = registerModel.Username,
                    FirstName = registerModel.FirstName,
                    LastName = registerModel.LastName,
                    Email = registerModel.Email,
                    PhoneNumber = registerModel.Phone,
                    EmailConfirmed = false

                };
              
                var identityResult = await this.userManager.CreateAsync(appUser, registerModel.Password);
                if (identityResult.Succeeded)
                {
                    await signInManager.SignInAsync(appUser, isPersistent: false);

                    Token tkn = new Token();
                    var tokenString = tkn.GetToken(appUser.Id.ToString(), _appSettings.Secret);


                    //if (appUser.Id != "")
                    //{

                    //    //create user 
                    //    var user = new User();
                    //    user.FirstName = appUser.FirstName;
                    //    user.LastName= appUser.LastName;
                    //    user.Email = appUser.Email;
                    //    user.Confirmend = appUser.EmailConfirmed;
                    //    user.Phone = appUser.PhoneNumber;
                    //    user.AspNetUserID = appUser.Id;
                    //    user.Username = appUser.Email;

                    //    //save User to db
                    //    _LGITDbContext.Users.Add(user);
                    //    _LGITDbContext.SaveChanges();


                    //  //  var sendEmail = _emailService.SendEmailAsync(email);

                    //}


                    // return basic user info (without password) and token to store client side
                    return Ok(new
                    {
                        Id = appUser.Id,
                        Email = appUser.Email,
                        FirstName = appUser.FirstName,
                        LastName = appUser.LastName,
                        TokenString = tokenString
                    });
                }
                else
                {
                    return BadRequest(identityResult.Errors);
                }
            }
            return BadRequest(ModelState);
        }

        [EnableCors("MyPolicy")]
        [AllowAnonymous]
        [HttpPost("confirm")]
        public IActionResult Confirm([FromQuery(Name = "guid")] string guid)
        {
            var email = _emailService.GetByGUID(guid);

            var deathTime = email.CreatedDate.AddMinutes(email.TimeToLiveMinutes);

            if (deathTime >= DateTime.Now)
            {
                var user = _appUserDbContext.Users.Find(email.userId);
                user.EmailConfirmed = true;
                _appUserDbContext.Users.Update(user);
                _appUserDbContext.SaveChanges();

                return new RedirectResult("http://localhost:4200/pages/auth/login");
            }
            else
            {
                return new RedirectResult("http://localhost:4200/pages/errors/500");

            }


        }

        
    }
}
