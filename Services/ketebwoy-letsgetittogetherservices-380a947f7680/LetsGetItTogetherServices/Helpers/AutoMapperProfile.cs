using AutoMapper;
using LetsGetItTogetherServices.Models;
using LetsGetItTogetherServices.Entities;

namespace LetsGetItTogetherServices.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<UserModel, User>();

            CreateMap<ApplicationUser, RegisterModel>();
            CreateMap<RegisterModel, ApplicationUser>();
        }
    }
}