using System;
using LetsGetItTogetherServices.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace LetsGetItTogetherServices.Data
{
    public partial class LGITContext : DbContext
    {
        public LGITContext()
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Email> Emails { get; set; }


        public LGITContext(DbContextOptions<LGITContext> options)
            : base(options)
        {
        }

        
    }
}
