using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LetsGetItTogetherServices.Entities
{
    public class Email
    {
        [Key]
        public string Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public DateTime CreatedDate { get; set; }
        public int TimeToLiveMinutes { get; set; } 
        public string userId { get; set; }
        public Guid guid { get; set; }

        public Email() { }

        public Email(string ToEmail, string FromEmail, int timeToLive)
        {
            this.To = ToEmail;
            this.From = FromEmail;
            this.TimeToLiveMinutes = timeToLive;
            this.Subject = "Ascentus Confirmation Email";
            this.guid = Guid.NewGuid();
            this.CreatedDate = DateTime.Now;
            var deadline = DateTime.Now.AddMinutes(this.TimeToLiveMinutes).ToShortTimeString();
            var link = "http://ascentuscore.com/v2/confirm?guid=" + this.guid; 

                       

            this.Message = "Please click the below link before: " + deadline + " to activate Login" +  System.Environment.NewLine + link;
        }

        
    }
}
