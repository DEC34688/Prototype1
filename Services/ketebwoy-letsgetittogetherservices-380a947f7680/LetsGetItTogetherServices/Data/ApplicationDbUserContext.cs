using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LetsGetItTogetherServices.Data
{
    public class ApplicationDbUserContext : IdentityDbContext
    {
        public ApplicationDbUserContext(DbContextOptions<ApplicationDbUserContext> options)
            : base(options)
        {
        }
    }
}
