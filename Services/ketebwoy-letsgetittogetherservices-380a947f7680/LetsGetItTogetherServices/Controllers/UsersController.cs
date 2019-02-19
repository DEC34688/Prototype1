using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using LetsGetItTogetherServices.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using LetsGetItTogetherServices.Interfaces;
using LetsGetItTogetherServices.Models;
using LetsGetItTogetherServices.Entities;
using LetsGetItTogetherServices.Data;

namespace LetsGetItTogetherServices.Controllers
{
    [Authorize]
    [ApiController]
    [Route("v1/")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly ApplicationDbUserContext _context;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings,
            ApplicationDbUserContext context)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserModel userModel)
        {
            var user = _userService.Authenticate(userModel.Username, userModel.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            Token tkn = new Token();
            var tokenString = tkn.GetToken(user.Id.ToString(), _appSettings.Secret);

            // return basic user info (without password) and token to store client side
            return Ok(new {
                Id = user.Id,
                Username = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                TokenString = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]UserModel userDto)
        {
            // map dto to entity
            var user = _mapper.Map<User>(userDto);

            try 
            {
                // save 
                _userService.Create(user, userDto.Password);
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var users =  _userService.GetAll();
            var userModels = _mapper.Map<IList<UserModel>>(users);
            return Ok(userModels);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user =  _userService.GetById(id);
            var userDto = _mapper.Map<UserModel>(user);
            return Ok(userDto);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UserModel userModel)
        {
            // map dto to entity and set id
            var user = _mapper.Map<User>(userModel);
            user.Id = id;

            try 
            {
                // save 
                _userService.Update(user, userModel.Password);
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }
    }
}
