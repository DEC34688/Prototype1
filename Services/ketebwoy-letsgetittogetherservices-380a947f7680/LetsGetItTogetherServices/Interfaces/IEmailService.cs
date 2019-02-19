using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using LetsGetItTogetherServices.Data;
using LetsGetItTogetherServices.Entities;
using LetsGetItTogetherServices.Helpers;
using LetsGetItTogetherServices.Models;
using Microsoft.Extensions.Options;
using RestSharp;
using RestSharp.Authenticators;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace LetsGetItTogetherServices.Interfaces
{
    public interface IEmailService
    {
        IEnumerable<Email> GetAll();
        Email GetById(int id);
        Email Create(Email email);
        void Update(Email email);
        void Delete(int id);
    }

    public class EmailService : IEmailService
    {
        private LGITContext _context;
        private AppSettings _appSettings;
       
        public EmailService(LGITContext context, IOptions<AppSettings> appSettings)
        {
            _context = context;

            // configure jwt authentication
            _appSettings = appSettings.Value;
        }

        public Email Confirm(Email email, User user)
        {
            // authentication successful
            return email;
        }

        public IEnumerable<Email> GetAll()
        {
            return _context.Emails;
        }

        public Email GetById(int id)
        {
            return _context.Emails.Find(id);
        }

        public Email GetByGUID(string guid)
        {
            return _context.Emails.FirstOrDefault(p => p.guid.ToString() == guid);
        }

        public Email Create(Email Email)
        {
                                   
            _context.Emails.Add(Email);
            _context.SaveChanges();
                       
            return Email;
        }

        public void Update(Email EmailParam)
        {
            var Email = _context.Emails.Find(EmailParam.Id);

            if (Email == null)
                throw new AppException("Email not found");
            
            //// update Email properties
            //Email.FirstName = EmailParam.FirstName;
            //Email.LastName = EmailParam.LastName;
            //Email.Emailname = EmailParam.Emailname;

            //// update password if it was entered
            //if (!string.IsNullOrWhiteSpace(password))
            //{
            //    byte[] passwordHash, passwordSalt;
            //    CreatePasswordHash(password, out passwordHash, out passwordSalt);

            //    Email.PasswordHash = passwordHash;
            //    Email.PasswordSalt = passwordSalt;
            //}

            _context.Emails.Update(Email);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var Email = _context.Emails.Find(id);
            if (Email != null)
            {
                _context.Emails.Remove(Email);
                _context.SaveChanges();
            }
        }

        public async System.Threading.Tasks.Task SendEmailAsync(Email email)
        {
            try
            {
             
                var apiKey = _appSettings.sendGridKey;
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress(email.From);
                var subject = email.Subject;
                var to = new EmailAddress(email.To);
                var msg = MailHelper.CreateSingleEmail(from, to, subject, email.Message, string.Empty);
                var response = await client.SendEmailAsync(msg);
              
            }
            catch (Exception)
            {

                throw;
            }
          
            

        }

        public Email CreateEmail(LetsGetItTogetherServices.Entities.ApplicationUser user)
        {
            var email = new Email(user.Email, _appSettings.adminEmail, _appSettings.timeToLive);

            return email;
        }
    }
}
